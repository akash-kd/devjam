import { createContext, useEffect, useState } from 'react'
import Player from '../components/Player'
import { io } from 'socket.io-client'
import { useContext } from 'react'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'
import SocketContext from '../SocketContext'
import { withRouter } from 'react-router'

import Chatbox from '../components/chatbox'

function Main(props) {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState(0)

  const handleGetRoom = r => {
    console.log(r)
    setState(state => {
      state.roomId = r.id
    })
    setUsers(r.count)
  }

  const handleGetID = id => {
    setState(state => {
      state.user.id = id
    })
  }

  const handleValidateRoom = check => {
    // Means he tried to join a non-existent room
    // so we kick him
    if (!check) {
      alert('Please enter a valid room code!')
      props.history.push('/')
    }
  }

  const handleUserJoin = name => {
    console.log(name, 'joined the room')
    console.log(state.user.id)
    setUsers(users => users + 1)
  }

  const handleUserLeave = name => {
    console.log(name, 'left the room')
    setUsers(users => users - 1)
  }

  useEffect(() => {
    console.log(state)

    socket.emit('enter', { name: state.user.username, room: state.roomId, type: state.user.isAdmin ? 'create' : 'join' })

    // Will happen if type mentioned by the user is create
    socket.on('getRoom', handleGetRoom)

    socket.on('getID', handleGetID)

    // Will happen if type mentioned by the user is join
    socket.on('validateRoom', handleValidateRoom)

    socket.on('userJoin', handleUserJoin)

    socket.on('userLeave', handleUserLeave)

    return () => {
      socket.emit('exit')
      socket.off('getRoom', handleGetRoom)
      socket.off('getID', handleGetID)
      socket.off('validateRoom', handleValidateRoom)
      socket.off('userJoin', handleUserJoin)
      socket.off('userLeave', handleUserLeave)
    }
  }, [])

  return (
    <div className="flex flex-row w-full h-full sm:flex-row p-10 justify-center">
      <Player users={users} />
      
      <Chatbox />
    </div>
  )
}

export default withRouter(Main)
