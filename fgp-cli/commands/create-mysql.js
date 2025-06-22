const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-mysql-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + MySQL en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Instalar dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express mysql2 dotenv cors", { stdio: "inherit" });

  // .env
  fs.writeFileSync(
    ".env",
    `
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=fgpdb
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
.vscode
.idea
.DS_Store
`.trim()
  );

  // db.js
  fs.writeFileSync(
    "db.js",
    `
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
`.trim()
  );

  // index.js
  fs.writeFileSync(
    "index.js",
    `
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", async (_req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
  res.status(201).json({ id: result.insertId, name, email });
});

app.put("/api/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
  res.json({ id, name, email });
});

app.delete("/api/users/:id", async (req, res) => {
  await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
  res.json({ msg: "Usuario eliminado" });
});

app.listen(process.env.PORT, () => {
  console.log(\`✅ Servidor listo en http://localhost:\${process.env.PORT}\`);
});
`.trim()
  );

  // method.http
  fs.writeFileSync(
    "method.http",
    `
### GET all users
GET http://localhost:3000/api/users

### POST new user
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Frank",
  "email": "frank@example.com"
}

### PUT user
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "Frank Updated",
  "email": "updated@example.com"
}

### DELETE user
DELETE http://localhost:3000/api/users/1
`.trim()
  );

  // Scripts en package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Express + MySQL generado.`);
  console.log(`\n👉 Pasos siguientes:
1. Crear la base de datos y tabla:
   \`\`\`sql
   CREATE DATABASE fgpdb;
   USE fgpdb;
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100)
   );
   \`\`\`
2. cd ${projectName}
3. npm start`);
};
