
$(document).ready(function() {
  var socket = io();
  function scrollToBottom () {
    // Selectors
    var messages = $('#message-list');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }
  
  socket.on("connect", function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      }
    });
  });
  
  socket.on("disconnect", function() {
    console.log("Disconnected From Server!");
  });

  socket.on('updateUserList', function(users) {
    var usersList = $('#users-list');
    usersList.html('');
    users.forEach(function(user) {
      usersList.append(`<a class="mdl-navigation__link" href="#">${user}</a>`);
    });
  });
  
  socket.on("newMessage", function(message) {
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      text: message.text,
      createdAt: moment(message.createdAt).format('h:mm a')
    });
    $('#message-list').append(html);
    scrollToBottom();
  });
  
  socket.on('newLocationMessage', function(message) {
    var template = $('#message-location-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: moment(message.createdAt).format('h:mm a')
    });
    $('#message-list').append(html);
    scrollToBottom();
  });
  
  $("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage",{
        text: $("#message-input").val()
      },
      function(data) {
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
        $("#message-input").val('');
      }
    );
    }, function () {
      alert('Unable to fetch location');
    });
  });
  
});
