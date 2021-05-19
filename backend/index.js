const express = require('express');
const http = require('http');
const socket = require('socket.io');
const chatEvents = require('./socketEvents/chatEvents');
const basicEvents = require('./socketEvents/basicEvents');

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

// To store info about each user
let users = [];

// A hashmap to store number of users in each room
let rooms = {};

io.on('connection', (socket) => {
  // Takes care of basic events the socket has to
  // be setup for like when the user joins/leaves/etc.
  basicEvents(socket, users, rooms);

  // Takes care of all chat events the socket has to
  // setup for like when the user sends/receives messages etc.
  chatEvents(socket, users);

  console.log(rooms);
});

server.listen(PORT, () => console.log(`[SERVER] Started!`));