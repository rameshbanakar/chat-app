const express = require("express");
const cors = require("cors");
const dontenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/connetdb");
const router = require("../server/router/index");
const {app,server}=require("./socket/index")

// const app = express();
app.use(cookieParser());
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

dontenv.config({ path: "./config.env" });
connectDb();
app.use(express.json());

app.use("/api", router);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("server is running@" + PORT));
