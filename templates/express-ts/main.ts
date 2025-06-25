import { createServer } from "http";
import { createApp } from "./app";
// import { setupSocket } from "./socket";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = createApp();
  const httpServer = createServer(app);

  // Socket.IO
  // setupSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`✅ HTTP server running at http://localhost:${PORT}`);
    // console.log(`📡 Socket.IO listening on same port`);
  });
};

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
