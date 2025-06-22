const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-postgres-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + PostgreSQL en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Instalar dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express pg dotenv cors", { stdio: "inherit" });

  // .env
  fs.writeFileSync(
    ".env",
    `
PORT=3000
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=fgpdb
PGPORT=5432
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
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

module.exports = pool;
`.trim()
  );

  // index.js
  fs.writeFileSync(
    "index.js",
    `
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (_req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
    [name, email]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  res.json({ msg: 'Usuario eliminado' });
});

app.listen(process.env.PORT, () => {
  console.log(\`✅ Servidor corriendo en http://localhost:\${process.env.PORT}\`);
});
`.trim()
  );

  // method.http
  fs.writeFileSync(
    "method.http",
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

  // Scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Express + PostgreSQL generado.`);
  console.log(`\n👉 Pasos siguientes:
1. Crea la base de datos: \`createdb fgpdb\`
2. Crea la tabla:
   \`\`\`sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name TEXT,
     email TEXT
   );
   \`\`\`
3. cd ${projectName}
4. npm start`);
};
