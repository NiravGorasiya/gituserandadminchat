
const express = require("express");
const server = express();
const http = require("http").Server(server);
const cors = require("cors");

const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// connection with database
const dbConnection = require("./db/server");
const { Conversion } = require("./models");

dbConnection();

// Socket io configurations
const io = require("socket.io")(http, {
  allowEIO3: true,
  cors: {
    origins: "*",
    methods: ["GET", "POST"],
  },
});

server.post("/chat", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    let meaagesData = await Conversion.findAll({
      $or: [
        { user_id: senderId, receiver_id: receiverId },
        { user_id: receiverId, receiver_id: senderId },
      ],
    });
    res.json(meaagesData);


  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
});

// Single chat
io.on("connection", (socket) => {
  socket.on("join", (receiver_id) => {
    socket.join(receiver_id);
  });

  socket.on("send-chat-message", (data) => {
    const { receiverId, message, senderId } = data;
    socket.broadcast.to(senderId).emit("chat-message", message);
    Conversion.create({
      user_id: senderId,
      receiver_id: receiverId,
      message: message,
    });

  });
});

http.listen(port, () => console.log(`http://127.0.0.1:${port}`));


server.get("/", (req, res) => res.send(`Hello world`));

server.use((error, req, res, next) => {
  return res.status(400).send({ message: error });
});


