function playerEvents(socket, users, rooms) {
  socket.on('sendInfo', data => {
    let user = users.find(user => user.id === socket.id);
    socket.broadcast.to(user.room).emit('getInfo', data);
  });

  socket.on('urlChanged', url => {
    let user = users.find(user => user.id === socket.id);
    socket.broadcast.to(user.room).emit('urlChange', url);
  });

  socket.on('paused', () => {
    let user = users.find(user => user.id === socket.id);
    socket.broadcast.to(user.room).emit('pause');
  });

  socket.on('played', () => {
    let user = users.find(user => user.id === socket.id);
    socket.broadcast.to(user.room).emit('play');
  });
}

module.exports = playerEvents
