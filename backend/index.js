const express = require('express');
const http = require('http');
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/app', (req, res) => {
  const { name, type, room } = req.body;
  res.render('app', { name, type, room });
});

let users = [];

io.on('connection', (socket) => {
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
      room = socket.id;

      // Sending room to client
      socket.emit('getRoom', room);
    }

    // Joining the socket to the room
    socket.join(room);

    // Will help us keep track of users
    users.push({ name, room });
  });

  // Helps us keep track of when the user disconnects
  socket.on('disconnect', () => {
    console.log('[SOCKET] Client disconnected!');
  });

  console.log(users);
});

server.listen(PORT, () => console.log(`[SERVER] Started!`));