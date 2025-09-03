const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-socketio-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express con Socket.IO en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express socket.io cors", { stdio: "inherit" });

  // Crea server.js
  fs.writeFileSync(
    "server.js",
    `
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('Servidor Socket.IO funcionando ✅');
});

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('mensaje', (msg) => {
    console.log('📩 Mensaje recibido:', msg);
    io.emit('mensaje', msg); // reenvía a todos
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('✅ Servidor escuchando en http://localhost:3000');
});
`.trim()
  );

  // Crea .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // Agrega script start
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Socket.IO generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
