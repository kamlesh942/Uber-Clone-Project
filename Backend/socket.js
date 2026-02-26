const socketIo = require("socket.io");
const userModel = require("./models/user_model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(
        `User with ID ${userId} and type ${userType} joined with socket ID ${socket.id}`,
      );
      if (userType === "user") {
        const user = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        const captain = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    socket.on("disconnect", () => {
      console.log(`A client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io is not initialized yet.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
