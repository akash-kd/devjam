const express = require('express');
const http = require('http');
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(PORT, () => console.log(`[SERVER] Started`));