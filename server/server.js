const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validator');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Please enter valid name and room');
		}
		socket.join(params.room);
		socket.emit('newMessage', generateMessage('Admin', `Hey ${params.name}, welcome to Socket Chat`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the chat!`));
		callback();
	});
	socket.on('createMessage', (message, callback) => {
		// console.log('Message Created', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from server');
	});

	socket.on('createLocationMessage', (message) => {
		io.emit('newLocationMessage', generateLocationMessage(message.from, message.lat, message.lng));
	});

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on localhost:${port}`);
});
