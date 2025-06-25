const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-docker-node") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Docker + Node.js en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Archivos base
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express", { stdio: "inherit" });

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hola desde Docker 🚀");
});

app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
});
`.trim()
  );

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts.start = "node index.js";
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  // Dockerfile
  fs.writeFileSync(
    "Dockerfile",
    `
# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copia de dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
`.trim()
  );

  // docker-compose.yml
  fs.writeFileSync(
    "docker-compose.yml",
    `
version: "3.9"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - PORT=3000
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
*.log
.DS_Store
.vscode
.idea
`.trim()
  );

  console.log("✅ Proyecto Node.js + Docker generado.");
  console.log(`\n👉 Pasos siguientes:
cd ${projectName}
docker-compose up --build`);
};
