import { createContext, useEffect, useState } from 'react'
import Player from '../components/Player'
import { io } from 'socket.io-client'
import { useContext } from 'react'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'
import { withRouter } from 'react-router'
import Chat from '../components/Chat'

import Chatbox from '../components/chatbox'

function Main(props) {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)
  const [users, setUsers] = useState(0)

  let socket
  const ENDPOINT = 'http://localhost:8080'
  socket = io(ENDPOINT)

  useEffect(() => {
    console.log(state)

    socket.emit('enter', { name: state.user.username, room: state.roomId, type: state.user.isAdmin ? 'create' : 'join' })

    // Will happen if type mentioned by the user is create
    socket.on('getRoom', r => {
      console.log(r)
      setState(state => {
        state.roomId = r.id
      })
      setUsers(r.count)
    })

    socket.on('getID', socket_id => {
      console.log(socket_id)
    })

    // Will happen if type mentioned by the user is join
    socket.on('validateRoom', check => {
      // Means he tried to join a non-existent room
      // so we kick him
      if (!check) {
        console.error('Please enter a valid room code!')
        props.history.push('/')
      }
    })
  }, [])

  socket.on('userJoin', name => {
    console.log(name, 'joined the room')
  })

  socket.on('userLeave', name => {
    console.log(name, 'left the room')
  })

  return (
    <>
      <Player socket={socket} />
      <Chatbox />
    </>
  )
}

export default withRouter(Main)
