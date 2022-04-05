// const app = require("express")();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// app.get("/", (req, res) => {
//   res.send("Node Server is running. Yay!!");
// });

// io.on("connection", (socket) => {
//   //Get the chatID of the user and join in a room of the same chatID
//   chatID = socket.handshake.query.chatID;
//   socket.join(chatID);

//   //Leave the room if the user closes the socket
//   socket.on("disconnect", () => {
//     socket.leave(chatID);
//   });

//   //Send message to only a particular user
//   socket.on("send_message", (message) => {
//     receiverChatID = message.receiverChatID;
//     senderChatID = message.senderChatID;
//     content = message.content;

//     //Send message to only that particular room
//     socket.in(receiverChatID).emit("receive_message", {
//       content: content,
//       senderChatID: senderChatID,
//       receiverChatID: receiverChatID,
//     });
//   });
// });

// // http.listen(3000);
// http.listen(process.env.PORT)

// const app = require("express")();
const httpServer = require('http').createServer()
const socketIO = require('socket.io')(httpServer)

// app.get("/", (req, res) => {
//   res.send("Chat service is running...");
// });

socketIO.on('connection', function (client) {
  console.log('Connected...', client.id);

//listens for new messages coming in
  client.on('message', function name(data) {
    console.log(data);
    socketIO.emit('message', data);
  })

//listens when a user is disconnected from the server
  client.on('disconnect', function () {
    console.log('Disconnected...', client.id);
  })

//listens when there's an error detected and logs the error on the console
  client.on('error', function (err) {
    console.log('Error detected', client.id);
    console.log(err);
  })
})

var port = process.env.PORT || 3000;
httpServer.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});