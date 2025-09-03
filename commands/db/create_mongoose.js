const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-mongoose-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + Mongoose en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Instalar dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express mongoose dotenv cors", { stdio: "inherit" });

  // .env
  fs.writeFileSync(".env", `
PORT=3000
MONGO_URI=mongodb://localhost:27017/fgpdb
`.trim());

  // .gitignore
  fs.writeFileSync(".gitignore", `
node_modules
.env
.vscode
.idea
.DS_Store
`.trim());

  // index.js
  fs.writeFileSync("index.js", `
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User");

app.get("/api/users", async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Eliminado" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(\`🚀 Servidor corriendo en http://localhost:\${process.env.PORT}\`);
    });
  })
  .catch(err => console.error("❌ Error al conectar:", err));
`.trim());

  // models/User.js
  fs.mkdirSync("models", { recursive: true });
  fs.writeFileSync("models/User.js", `
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
`.trim());

  // request.http
  fs.writeFileSync("request.http", `
### GET all users
GET http://localhost:3000/api/users

### POST new user
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Frank",
  "email": "frank@example.com"
}

### PUT update user
PUT http://localhost:3000/api/users/685a9370616903f7e9d840d5
Content-Type: application/json

{
  "name": "Frank Updated"
}

### DELETE user
DELETE http://localhost:3000/api/users/685a9370616903f7e9d840d5
`.trim());

  // Scripts en package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js"
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Express + Mongoose generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
