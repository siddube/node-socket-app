var socket = io();

socket.on("connect", function() {
  console.log("Connected To Server!");
});

socket.on("disconnect", function() {
  console.log("Disconnected From Server!");
});

socket.on("newMessage", function(message) {
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $('#message-list').prepend(html);
});

socket.on('newLocationMessage', function(message) {
  var template = $('#message-location-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $('#message-list').prepend(html);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit("createMessage",{
      from: "User",
      text: $("#message-input").val()
    },
    function(data) {
      console.log("Got it!", data);
      $("#message-input").val('');
    }
  );
});

var locbtn = $('#send-location-btn');
locbtn.on('click', function (e) {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Your browser does not support Geolocation');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit("createLocationMessage",{
      from: "User",
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    function(data) {
      console.log("Got it!", data);
      $("#message-input").val('');
    }
  );
  }, function () {
    alert('Unable to fetch location');
  });
});
