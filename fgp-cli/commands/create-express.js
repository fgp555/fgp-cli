const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-express-app") {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`🚀 Creando proyecto Express en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express cors morgan", { stdio: "inherit" });

  fs.mkdirSync("routes");
  fs.mkdirSync("controllers");

  fs.writeFileSync(
    "server.js",
    `
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('✅ Servidor listo en http://localhost:3000');
});
`
  );

  fs.writeFileSync(
    "routes/user.routes.js",
    `
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.findAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
`
  );

  fs.writeFileSync(
    "controllers/user.controller.js",
    `
let users = [];
let id = 1;

exports.findAll = (req, res) => res.json(users);

exports.create = (req, res) => {
  const user = { id: id++, ...req.body };
  users.push(user);
  res.status(201).json(user);
};

exports.update = (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ msg: 'No encontrado' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
};

exports.remove = (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ msg: 'Eliminado' });
};
`
  );

  // Crea .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
      node_modules
      dist
      .env
      *.log
      *.local
      .vscode
      .idea
      .DS_Store
      `.trim()
  );

  // Crea method.http desde plantilla
  const templatePath = path.join(__dirname, "../templates/method-template.http");
  const methodHttpContent = fs.readFileSync(templatePath, "utf-8");
  fs.writeFileSync("method.http", methodHttpContent);

  console.log(`✅ Proyecto generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm start`);
};
