const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-sqlite-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + SQLite en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express sqlite3 cors", { stdio: "inherit" });

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
*.db
.vscode
.idea
.DS_Store
`.trim()
  );

  // db.js
  fs.writeFileSync(
    "db.js",
    `
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  \`);
});

module.exports = db;
`.trim()
  );

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", (_req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO users(name, email) VALUES(?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});

app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: req.params.id, name, email });
  });
});

app.delete("/api/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: "Usuario eliminado" });
  });
});

app.listen(3000, () => {
  console.log("✅ Servidor listo en http://localhost:3000");
});
`.trim()
  );

  // request.http
  fs.writeFileSync(
    "request.http",
    `
### GET all users
GET http://localhost:3000/api/users

### POST user
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

  // Agregar script
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Express + SQLite generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
