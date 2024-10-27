const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
// all socket connections

const server = http.createServer(app);
console.log("process.env.FRONTEND_URL", process.env.FRONTEND_URL);
const io = new Server(server, {
  cors: {
    origin:"http://localhost:3000",
    credentials: true,
  },
});
const onlineUser=new Set()  
io.on("connection", async(socket) => {
  console.log("user connected", socket.id);
  const token=socket.handshake.auth.token

  const getUser=await jwt.verify(token,process.env.SECRET_KEY)
  const user = await UserModel.findById({ _id: getUser.id.id }).select("-password");

  socket.join(user?._id)
  onlineUser.add(user?._id);

  io.emit("onlineUsers",Array.from(onlineUser))
  


  // console.log("user", user);
  //disconnect the user
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id)
    console.log("user disconnected", socket.id);
  });
});

module.exports = { app, server };
