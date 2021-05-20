import { Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import TextInput from './textInput'


//Components
import Button from './button.js'

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
    height: '500',
    width: '900',
  }

  return (
    <div className='flex justify-center'>
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-row">
          <TextInput placeholder='Enter YT video link' value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
          <button type='submit' text="Go" className="flex shadow-md items-center justify-center text-white py-2 px-2 my-2 text-center border-2 rounded-md border-indigo-600 bg-indigo-500">Go</button>
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
