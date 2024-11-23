const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const {
  conversationModel,
  messageModel,
} = require("../model/ConversationModel");

// all socket connections

const server = http.createServer(app);
console.log("process.env.FRONTEND_URL", process.env.FRONTEND_URL);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUser = new Set();
io.on("connection", async (socket) => {
  // console.log("user connected", socket.id);
  const token = socket.handshake.auth.token;

  const getUser = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await UserModel.findById({ _id: getUser.id.id }).select(
    "-password"
  );

  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUsers", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    // console.log(userId);
    const userDetails = await UserModel.findById(userId).select("-password");

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userId),
    };
    socket.emit("message-user", payload);
  });

  // new message
  socket.on("new message", async (data) => {
    //check the user conversation available in the database
    let conversation = await conversationModel.findOne({
      "$or": [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });
    if (!conversation) {
      const createConversation = new  conversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });
      conversation=await createConversation.save();
    }
    const message = new messageModel({
      text: data.text,
      videoURL: data.videoURL,
      imageURL: data.imageURL,
      msgByUserId: data.msgByUserId,
    });
    
    const saveMessage=await message.save()
    console.log(saveMessage)
    const updateConversation = await conversationModel.updateOne(
      { _id: conversation._id },
      { "$push": { message: saveMessage?._id } }
    );
    
    const getConversationMessage = await conversationModel
      .findOne({
       "$or": [
          { sender: data?.sender, receiver: data?.receiver },
          { sender: data?.receiver, receiver: data?.sender },
        ],
      })
      .populate("message")
      .sort({updatedAt:-1});

      console.log(getConversationMessage);

      io.to(data?.sender).emit("message", getConversationMessage.message);
      io.to(data?.receiver).emit("message", getConversationMessage.message);
    

  });

   
  //disconnect the user
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    // console.log("user disconnected", socket.id);
  });
});

module.exports = { app, server };
