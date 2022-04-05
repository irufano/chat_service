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

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


app.get("/", (req, res) => {
  res.send("Chat Service is running...");
});

io.on("connection", function (client) {
  console.log("client connect...", client.id);

  client.on("typing", function name(data) {
    console.log(data);
    io.emit("typing", data);
  });

  client.on("message", function name(data) {
    console.log(data);
    io.emit("message", data);
  });

  client.on("location", function name(data) {
    console.log(data);
    io.emit("location", data);
  });

  client.on("connect", function () {});

  client.on("disconnect", function () {
    console.log("client disconnect...", client.id);
    // handleDisconnect()
  });

  client.on("error", function (err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err;
  console.log("Listening on port %d", server_port);
});
