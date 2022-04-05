const express = require("express");

// const server = require('http').createServer()
var port = process.env.PORT;

const app = express();
const server = app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Listening on port", port);
});
const socketIO = require("socket.io")(server);

socketIO.on("connection", function (client) {
  console.log("Connected...", client.id);

  client.on("message", function name(data) {
    console.log(data);
    socketIO.emit("message", data);
  });

  client.on("disconnect", function () {
    console.log("Disconnected...", client.id);
  });

  client.on("error", function (err) {
    console.log("Error detected", client.id);
    console.log(err);
  });
});


// server.listen(port, function (err) {
//   if (err) console.log(err);
//   console.log("Listening on port", port);
// });
