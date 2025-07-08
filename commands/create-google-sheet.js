const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-express-app") {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`🚀 Creando proyecto Express en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express cors morgan dotenv", { stdio: "inherit" });
  execSync("npm install googleapis", { stdio: "inherit" });

  fs.mkdirSync("sheets");

  // credentials.json
  fs.writeFileSync("credentials.json", `{}`.trim(), "utf-8");

  // index.js
  const indexPath = path.join(__dirname, "../templates/google-sheet/index.js");
  fs.writeFileSync("index.js", fs.readFileSync(indexPath, "utf-8"));

  // basic.js
  const basicPath = path.join(__dirname, "../templates/google-sheet/basic.js");
  fs.writeFileSync("basic.js", fs.readFileSync(basicPath, "utf-8"));

  // request.http
  const requestPath = path.join(__dirname, "../templates/google-sheet/request.http");
  fs.writeFileSync("request.http", fs.readFileSync(requestPath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../templates/google-sheet/.gitignore");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

  // .env
  const envPath = path.join(__dirname, "../templates/google-sheet/.env");
  fs.writeFileSync(".env", fs.readFileSync(envPath, "utf-8"));

  // Controller
  const ctrlPath = path.join(__dirname, "../templates/google-sheet/sheets/sheet.controller.js");
  fs.writeFileSync("sheets/sheet.controller.js", fs.readFileSync(ctrlPath, "utf-8"));

  // Routes
  const routesPath = path.join(__dirname, "../templates/google-sheet/sheets/sheet.routes.js");
  fs.writeFileSync("sheets/sheet.routes.js", fs.readFileSync(routesPath, "utf-8"));

  // Service
  const servicePath = path.join(__dirname, "../templates/google-sheet/sheets/sheet.service.js");
  fs.writeFileSync("sheets/sheet.service.js", fs.readFileSync(servicePath, "utf-8"));

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
    dev: "node --watch index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm start`);
};
