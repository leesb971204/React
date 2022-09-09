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

const userList = [];
let columnsList = {
  Todo: {
    name: "Todo",
    items: [],
  },
  InProgress: {
    name: "In Progress",
    items: [],
  },
  Done: {
    name: "Done",
    items: [],
  },
  Notes: {
    name: "Notes & Reference",
    items: [],
  },
};
io.on("connection", (socket) => {
  let user;

  socket.on("join", (data) => {
    if (user) {
      return false;
    }
    user = data;
    userList.push(user);
    io.emit("join", userList);
    io.emit("test", columnsList);
    console.log(userList);
  });

  socket.on("addItem", (key, copiedItems) => {
    columnsList = {
      ...columnsList,
      [key]: {
        ...columnsList[key],
        items: copiedItems,
      },
    };
    io.emit("addItem", columnsList);
  });

  socket.on("deleteItem", (key, copiedItems) => {
    columnsList = {
      ...columnsList,
      [key]: {
        ...columnsList[key],
        items: copiedItems,
      },
    };
    io.emit("deleteItem", columnsList);
  });
  socket.on(
    "toOntherColumn",
    (sourceId, sourceItem, destinationId, destinationItem) => {
      io.emit(
        "toOntherColumn",
        sourceId,
        sourceItem,
        destinationId,
        destinationItem
      );
    }
  );

  socket.on("disconnect", () => {
    if (!user) {
      return false;
    }
    userList.splice(userList.indexOf(user), 1);
    io.emit("left", userList);
  });
});

server.listen(4000, () => console.log(`Listening on port 4000`));
