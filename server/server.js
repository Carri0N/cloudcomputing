const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const port = process.env.PORT || 3000;
var moment = require('moment');

var userlist = [];

io.on('connection', (socket) => {

  socket.on('disconnect', function(){
    userlist = userlist.filter(x => x != socket.nickname);
    console.log(socket.nickname + ' disconnected');
  })

  socket.on('join', function(info) {
    socket.join(info.chat);
    socket.nickname = info.user;
    userlist.push(info.user);
    socket.broadcast.to(info.chat).emit('message', {timestamp: moment().format('hh:mm A'), user: "Server", msg: socket.nickname + ' has joined'}); //send msg to e1 in same chat
    console.log(info.user + ' joined ' + info.chat);
  })

  socket.on('message', function(info) {
    io.in(info.chat).emit('message', {timestamp: moment().format('hh:mm A') ,user: socket.nickname, msg: info.msg});
  })

  socket.on('file', function() {
    console.log("file");
  })

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
