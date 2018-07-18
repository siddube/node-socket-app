const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
	console.log("New User Connected!");
	
	socket.emit("newMessage", {
		from: 'Gayathri',
		text: 'Love you son!',
		createdAt: 123456
	});

	socket.on("createMessage", (message) => {
		console.log("Message Created", message);
	});

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on localhost:${port}`);
});
