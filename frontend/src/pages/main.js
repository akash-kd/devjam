import { createContext } from 'react'
import Player from '../components/Player'

function Main() {
  const socket = 'ws://localhost:8080'
  return (
    <>
      <Player socket={socket} />
    </>
  )
}

export default Main
