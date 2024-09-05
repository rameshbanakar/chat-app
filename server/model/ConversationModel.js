const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      defualt: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
    videoURL: {
      type: String,
      defualt: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const messageModel = mongoose.model("message", messageSchema);

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    message: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);
const conversationModel = mongoose.model("conversation", conversationSchema);
model.exports={conversationModel,messageModel}