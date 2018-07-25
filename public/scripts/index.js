var socket = io();

socket.on("connect", function() {
  console.log("Connected To Server!");
});

socket.on("disconnect", function() {
  console.log("Disconnected From Server!");
});

socket.on("newMessage", function(message) {
  console.log("New Message", message);
  var list = `
  <li class="mdl-list__item">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-icon">person</i>
      <span id="message-text">${message.text}</span>
    </span>
  </li>`;
  $('#message-list').prepend(list);
});

socket.on('newLocationMessage', function(message) {
  console.log(message);
  var list = `
  <li class="mdl-list__item">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-icon">person</i>
      <a id="loc-link" href="${message.url}" target="_blank">See My Location</a>
    </span>
  </li>`;
  $('#message-list').prepend(list);
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
