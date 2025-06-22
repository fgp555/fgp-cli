const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-socketio-ts-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + Socket.IO con TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa proyecto
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express socket.io cors", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node @types/express @types/cors", { stdio: "inherit" });

  // tsconfig.json
  fs.writeFileSync(
    "tsconfig.json",
    `
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
`.trim()
  );

  // Estructura
  fs.mkdirSync("src");

  // src/server.ts
  fs.writeFileSync(
    "src/server.ts",
    `
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Servidor Socket.IO con TypeScript funcionando ✅');
});

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('mensaje', (msg) => {
    console.log('📩 Mensaje recibido:', msg);
    io.emit('mensaje', msg);
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

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
dist
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // method.http
  fs.writeFileSync(
    "method.http",
    `
### GET principal
GET http://localhost:3000/
`.trim()
  );

  // Scripts en package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "ts-node src/server.ts",
    build: "tsc",
    start: "node dist/server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Socket.IO + TypeScript generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm run dev`);
};
