const express = require("express");
const { Server } = require("socket.io");
const http  = require("http");
const app = express();

// all socket connections

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  //disconnect the user
  io.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

module.exports={app,server}