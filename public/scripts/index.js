var socket = io();
socket.on("connect", function() {
  console.log("Connected To Server!");
  /* socket.emit("createMessage", {
    to: "Gayathri",
    text: "Love you too, mother!"
  }); */
});
socket.on("disconnect", function() {
  console.log("Disconnected From Server!");
});
socket.on("newMessage", function(message) {
  console.log("New Message", message);
});
