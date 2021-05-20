import { Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TextInput from './textInput'
import ReactPlayer from 'react-player'
import Button from './button'
import StateContext from '../StateContext'

function Player({ socket }) {
  const state = useContext(StateContext)
  const [inputUrl, setInputUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=MnUd31TvBoU')
  const [isPlaying, setIsPlaying] = useState(true)
  const player = useRef()

  //listen for Video Info for the first time component renders
  useEffect(() => {
    socket.on('getInfo', data => {
      setVideoUrl(data.url)
      player.current.seekTo(data.currTime)
      //playing if the received status is play, else pause, will adjust for buffering later
      setIsPlaying(data.currStatus === 1)
      // if (data.currStatus == 1) player.current.getInternalPlayer().playVideo()
      // else player.current.getInternalPlayer().pauseVideo()
    })

    // emitting Video Info from admin if new user joins
    if (state.user.isAdmin) {
      socket.on('userJoin', name => {
        socket.emit('sendInfo', {
          url: videoUrl,
          currTime: player.current.getCurrentTime(),
          currStatus: player.current.getInternalPlayer().getPlayerState(),
        })
      })
    }

    //listening for pause from server
    socket.on('pause', () => {
      player.current.getInternalPlayer().pauseVideo()
    })

    //listening for urlChange from server
    socket.on('urlChange', url => {
      setVideoUrl(url)
    })
  }, [])

  //sending pause Event from Admin so server sends a Pause to everyone in the room
  const onPause = e => {
    console.log(player.current.getCurrentTime())
    if (state.user.isAdmin) socket.emit('paused', 'VIDEO PAUSED')
  }

  //sending UrlChanged event so server broadcasts a urlChange event
  const handleSubmit = e => {
    e.preventDefault()
    console.log(player.current.getInternalPlayer().getPlayerState())
    console.log(player.current.getCurrentTime())
    console.log(videoUrl)

    setVideoUrl(inputUrl)
    socket.emit('urlChanged', videoUrl)
    // setVideoId(inputUrl.split('v=')[1].split('&')[0])
  }

  return (
    <div>
      {state.user.isAdmin && (
        <div>
          <form onSubmit={handleSubmit}>
            <TextInput placeholder='Enter YT video link' value={inputUrl} onChange={e => setInputUrl(e.target.value)} />
            <Button text='change video' type='submit' />
          </form>
        </div>
      )}
      <div>
        <ReactPlayer
          ref={player}
          config={{
            youtube: {
              playerVars: { controls: state.user.isAdmin ? 1 : 0 },
            },
          }}
          url={videoUrl}
          width='800px'
          height='450px'
          style={{ pointerEvents: !state.user.isAdmin && 'none' }}
          onPause={onPause}
          playing={isPlaying}
        />
      </div>
    </div>
  )
}

export default Player
