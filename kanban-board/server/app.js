const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (key, name, copiedItems) => {
    io.emit("message", key, name, copiedItems);
  });
});

server.listen(4000, () => console.log(`Listening on port 4000`));
