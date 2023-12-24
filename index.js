import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Chat application backend!");
});

const server = createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "https://chat-app-saurabh.vercel.app",
  },
});

socketIO.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    socketIO.emit("messageResponse", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
