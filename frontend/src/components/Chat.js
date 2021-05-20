import React from 'react'

function Chat({ socket }) {
  // Will happen if a new user joins our room
  socket.on('userJoin', name => {
    console.log(`${name} has joined the room!</div>`)
  })

  socket.on('userLeave', name => {
    console.log(`${name} has left the room!</div>`)
  })
  return <div>CHAT</div>
}

export default Chat
