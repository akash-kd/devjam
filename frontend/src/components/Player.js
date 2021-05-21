import { Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TextInput from './textInput'
import ReactPlayer from 'react-player'
import Button from './button'
import StateContext from '../StateContext'
import SocketContext from '../SocketContext'

function Player({ users }) {
  const state = useContext(StateContext)
  const socket = useContext(SocketContext)
  const [inputUrl, setInputUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=MnUd31TvBoU')
  const [isPlaying, setIsPlaying] = useState(true)
  const player = useRef()

  const handleGetInfo = data => {
    setVideoUrl(data.url)
    player.current.seekTo(data.currTime)
    //playing if the received status is play, else pause, will adjust for buffering later
    setIsPlaying(data.currStatus == 1)
    // if (data.currStatus == 1) player.current.getInternalPlayer().playVideo()
    // else player.current.getInternalPlayer().pauseVideo()
  }

  const handleUserJoin = name => {
    if (state.user.isAdmin)
      socket.emit('sendInfo', {
        url: videoUrl,
        currTime: player.current.getCurrentTime(),
        currStatus: player.current.getInternalPlayer().getPlayerState(),
      })
  }

  const handlePause = () => {
    if (!state.user.isAdmin) player.current.getInternalPlayer().pauseVideo()
  }

  const handlePlay = () => {
    if (!state.user.isAdmin) player.current.getInternalPlayer().playVideo()
  }

  const handleUrlChange = url => {
    if (!state.user.isAdmin) setVideoUrl(url)
  }

  const handleSeek = currTime => {
    if (!state.user.isAdmin) player.current.seekTo(currTime)
  }

  //listen for Video Info for the first time component renders
  useEffect(() => {
    socket.on('getInfo', handleGetInfo)

    // emitting Video Info from admin if new user joins
    socket.on('userJoin', handleUserJoin)

    //listening for pause from server
    socket.on('pause', handlePause)

    //listening for play from server
    socket.on('play', handlePlay)

    //listening for urlChange from server
    socket.on('urlChange', handleUrlChange)

    socket.on('seek', handleSeek)

    return () => {
      socket.off('getInfo', handleGetInfo)
      socket.off('seek', handleSeek)
      socket.off('userJoin', handleUserJoin)
      socket.off('pause', handlePause)
      socket.off('play', handlePlay)
      socket.off('urlChange', handleUrlChange)
    }
  }, [])

  //sending pause Event from Admin so server sends a Pause to everyone in the room
  const onPause = e => {
    console.log(player.current.getCurrentTime())
    if (state.user.isAdmin) socket.emit('paused')
  }

  const onPlay = e => {
    console.log(player.current.getCurrentTime())
    if (state.user.isAdmin) socket.emit('played')
  }

  //sending UrlChanged event so server broadcasts a urlChange event
  const handleSubmit = e => {
    e.preventDefault()
    // console.log(player.current.getInternalPlayer())
    console.log(videoUrl)
    console.log(ReactPlayer.canPlay(videoUrl))
    setVideoUrl(inputUrl)
    socket.emit('urlChanged', inputUrl)
    // setVideoId(inputUrl.split('v=')[1].split('&')[0])
  }

  const onSeek = e => {
    console.log(player.current.getCurrentTime())
    socket.emit('seeked', player.current.getCurrentTime())
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
        {!ReactPlayer.canPlay(videoUrl) && <div>INVALID URL</div>}
        <ReactPlayer
          ref={player}
          id='player'
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
          onPlay={onPlay}
          playing={isPlaying}
          onSeek={onSeek}
        />
      </div>
      <div>ROOMID = {' ' + state.roomId}</div>
      {state.user.isAdmin && <div>USERS = {' ' + users}</div>}
    </div>
  )
}

export default Player
