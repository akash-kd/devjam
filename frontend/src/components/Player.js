import { Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import TextInput from './textInput'

function Player(props) {
  //    useEffect(() => {
  //         props.socket.
  //    },[])

  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  // const player = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(videoUrl)
    console.log(videoId)
    if (videoUrl && videoUrl.split('v=')[1]) {
      setVideoId(videoUrl.split('v=')[1].split('&')[0])
    }
  }

  const opts = {
    playerVars: {
      autoplay: 1,
    },
    height: '450',
    width: '800',
  }

  return (
    <div className='App'>
      MAIN APP
      <div>
        <form onSubmit={handleSubmit}>
          <TextInput placeholder='Enter YT video link' value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
          <button type='submit'>Go</button>
        </form>
        <div>
          <YouTube
            // ref={player}
            videoId={videoId}
            containerClassName='embed embed-youtube'
            // onStateChange={e => checkElapsedTime(e)}
            opts={opts}
          />
        </div>
      </div>
    </div>
  )
}

export default Player
