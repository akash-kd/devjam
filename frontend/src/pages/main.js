import { createContext, useEffect } from 'react'
import Player from '../components/Player'
import { io } from 'socket.io-client'

function Main() {
  // useEffect(() => {
  //   const socket = io('https://localhost:8080')
  //   socket.on('enter')
  // }, [])
  return (
    <>
      <Player />
    </>
  )
}

export default Main
