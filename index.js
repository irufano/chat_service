const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIO = require("socket.io")(server);

app.get("/", function (req, res) {
  res.send("Chat service is running...");
});

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

var port = process.env.PORT;

server.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Listening on port", port);
});
