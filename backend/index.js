const express = require('express');
const http = require('http');
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/app', (req, res) => {
  res.render('app');
});

io.on('connection', (socket) => {
  console.log('[SERVER] New connection!');
});

server.listen(PORT, () => console.log(`[SERVER] Started!`));