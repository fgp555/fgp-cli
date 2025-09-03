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

  // scripts.js
  const scriptsPath = path.join(__dirname, "../../templates/express-expo/scripts.js");
  fs.writeFileSync("scripts.js", fs.readFileSync(scriptsPath, "utf-8"));

  // server.mjs
  const serverPath = path.join(__dirname, "../../templates/express-expo/server.mjs");
  fs.writeFileSync("server.mjs", fs.readFileSync(serverPath, "utf-8"));

  // request-exp.host.http
  const requestExpoPath = path.join(__dirname, "../../templates/express-expo/request-exp.host.http");
  fs.writeFileSync("request-exp.host.http", fs.readFileSync(requestExpoPath, "utf-8"));

  // request-local.http
  const requestLocalPath = path.join(__dirname, "../../templates/express-expo/request-local.http");
  fs.writeFileSync("request-local.http", fs.readFileSync(requestLocalPath, "utf-8"));

  // config.md
  const configPath = path.join(__dirname, "../../templates/express-expo/config.md");
  fs.writeFileSync("config.md", fs.readFileSync(configPath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../../templates/gitignore.txt");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "node --watch server.mjs",
    start: "node server.mjs",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm start`);
};
