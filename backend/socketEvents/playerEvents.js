function playerEvents(socket, users, rooms) {
  socket.on('sendInfo', data => {
    let user = users.find(user => user.id === socket.id);
    socket.broadcast.to(user.room).emit('getInfo', data);
  });
}

module.exports = playerEvents
