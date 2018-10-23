const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const port = process.env.PORT || 3000;
const moment = require('moment');

io.on('connection', (socket) => {

  socket.on('disconnect', function(){
    console.log(socket.nickname + ' disconnected');
  })

  socket.on('join', function(info) {
    socket.join(info.chat);
    socket.nickname = info.user;
    socket.broadcast.to(info.chat).emit('message', {timestamp: 'Server', user: 'Info', msg: socket.nickname + ' has joined!'}); //send msg to e1 in same chat
    socket.emit('message', {timestamp: "Server", user: "Info", msg:"Welcome "+ socket.nickname +"! Type \\help for available commands"});
    console.log(info.user + ' joined room: ' + info.chat + '!');
  })

  socket.on('leave', function(chat) {
    console.log(socket.nickname + ' left room: ' + info.chat + '!');
    socket.leave(chat);
  })

  socket.on('message', function(info) {
    io.in(info.chat).emit('message', {timestamp: moment().format('hh:mm A') ,user: socket.nickname, msg: info.msg});
  })

  socket.on('whisper', function(info){
    console.log(socket.nickname + " whisper to " + info.user);
    findClientsSocket().forEach(element =>{
      if(element.nickname == info.user) {
        msg = {timestamp: moment().format('hh:mm A'),user: socket.nickname + " whispers", msg: info.msg}
        element.emit('message', msg);
        socket.emit('message', msg);
        return;
      }
    })
  })

  socket.on('file', function() {
    console.log("file");
  })

  socket.on('list', function() {
    console.log(socket.nickname + ': list request');
    var users = "";
    findClientsSocket().forEach(element => {
      users += element.nickname +" ";
    });
    socket.emit('message', {timestamp: 'Server', user: 'Online Users', msg: users});
    console.log(users);
  })

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});

function findClientsSocket(roomId, namespace) {
  var res = []
  // the default namespace is "/"
  , ns = io.of(namespace ||"/");

  if (ns) {
      for (var id in ns.connected) {
          if(roomId) {
              var index = ns.connected[id].rooms.indexOf(roomId);
              if(index !== -1) {
                  res.push(ns.connected[id]);
              }
          } else {
              res.push(ns.connected[id]);
          }
      }
  }
  return res;
}
