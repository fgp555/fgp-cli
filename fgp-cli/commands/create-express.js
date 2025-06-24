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

  fs.mkdirSync("src");
  fs.mkdirSync("src/user");

  // main.js en la raíz
  const mainPath = path.join(__dirname, "../templates/express/main.js");
  fs.writeFileSync("src/main.js", fs.readFileSync(mainPath, "utf-8"));

  // src/app.js para registrar rutas
  const appPath = path.join(__dirname, "../templates/express/app.js");
  fs.writeFileSync("src/app.js", fs.readFileSync(appPath, "utf-8"));

  // Controller
  const ctrlPath = path.join(__dirname, "../templates/express/user/user.controller.js");
  fs.writeFileSync("src/user/user.controller.js", fs.readFileSync(ctrlPath, "utf-8"));

  // Routes
  const routesPath = path.join(__dirname, "../templates/express/user/user.routes.js");
  fs.writeFileSync("src/user/user.routes.js", fs.readFileSync(routesPath, "utf-8"));

  // Service
  const servicePath = path.join(__dirname, "../templates/express/user/user.service.js");
  fs.writeFileSync("src/user/user.service.js", fs.readFileSync(servicePath, "utf-8"));

  // Repository
  const repoPath = path.join(__dirname, "../templates/express/user/user.repository.js");
  fs.writeFileSync("src/user/user.repository.js", fs.readFileSync(repoPath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../templates/gitignore.txt");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

  // request.http
  const methodPath = path.join(__dirname, "../templates/request.http");
  fs.writeFileSync("request.http", fs.readFileSync(methodPath, "utf-8"));

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "node --watch src/main.js",
    start: "node src/main.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm start`);
};
