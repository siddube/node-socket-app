const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New User Connected!');
	
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

	socket.on('createMessage', (message, callback) => {
		// console.log('Message Created', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from server');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
	});

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on localhost:${port}`);
});
