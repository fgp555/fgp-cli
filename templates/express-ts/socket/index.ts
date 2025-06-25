/* 
npm install socket.io
npm install -D @types/socket.io
*/

// import { Server as SocketIOServer } from "socket.io";
// import { Server as HTTPServer } from "http";

// export const setupSocket = (httpServer: HTTPServer) => {
//   const io = new SocketIOServer(httpServer, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`🔌 New client connected: ${socket.id}`);

//     socket.on("ping", () => {
//       console.log("📡 Ping received");
//       socket.emit("pong");
//     });

//     socket.on("disconnect", () => {
//       console.log(`❌ Client disconnected: ${socket.id}`);
//     });
//   });
// };
