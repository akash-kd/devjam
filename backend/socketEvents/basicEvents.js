function basicEvents(socket, users)
{
  // Every user on joining the app will send
  // the name, room (code if any) and type (join/create) 
  // to the server through this event "enter"
  socket.on('enter', ({ name, room, type }) => {
    console.log('[SOCKET] New client connected!');

    // If the type is create, we have to create the room ourselves
    // We also have to send it to the client so that it is aware about
    // the room we created for it
    if (type === 'create')
    {
      // Creating room
      room = `RO${socket.id}OM`;

      // Sending room to client
      socket.emit('getRoom', room);
    }

    // Joining the socket to the room
    socket.join(room);

    // If the user is joining an already existing room
    // We need to alert the other users already in the room
    // that the user has joined. This event helps with that
    if (type === 'join')
      socket.broadcast.to(room).emit('userJoin', name);

    // Will help us keep track of users
    users.push({ id: socket.id, name, room });
  });

  // Helps us keep track of when the user disconnects
  // so that we can perform cleanup tasks
  socket.on('disconnect', () => {
    console.log('[SOCKET] Client disconnected!');

    // Remove the user from the global users list
    let user = users.splice(users.findIndex(user => user.id === socket.id), 1)[0];
    
    // Tells all the other users in that room, that the user has left
    socket.broadcast.to(user.room).emit('userLeave', user.name);
  });
}

module.exports = basicEvents;