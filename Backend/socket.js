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
  })

  io.on("connection", (socket) => {
    console.log(`A client connected: ${socket.id}`);

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

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if (!userId || !location.ltd==null || !location.lng==null) {
        return socket.emit("error", "Invalid location data");
      }
      await captainModel.findByIdAndUpdate(userId, {
        location :{
          ltd: location.ltd,
          lng: location.lng
        }
      });
    });

    socket.on("disconnect", () => {
      console.log(`A client disconnected: ${socket.id}`);
    });

    
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  }
  else{
    console.error("Socket.io not initialized. Cannot send message.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
