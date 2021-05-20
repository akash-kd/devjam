import { createContext, useEffect } from 'react'
import Player from '../components/Player'
import { io } from 'socket.io-client'
import { useContext } from 'react'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'
import { withRouter } from 'react-router'

function Main(props) {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)

  const socket = io('http://localhost:8080')
  useEffect(() => {
    console.log(state)
    socket.emit('enter', { name: state.user.username, room: state.roomId, type: state.user.isAdmin ? 'create' : 'join' })
    // Will happen if type mentioned by the user is create
    socket.on('getRoom', r => {
      console.log(r)
      setState(state => {
        state.roomId = r
      })
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
        // props.history.push('/')
      }
    })

    // Will happen if a new user joins our room
  }, [])
  socket.on('userJoin', name => {
    console.log(`${name} has joined the room!</div>`)
  })
  return (
    <>
      <Player />
    </>
  )
}

export default withRouter(Main)
