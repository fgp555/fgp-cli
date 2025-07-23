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
  execSync("npm install jsonwebtoken", { stdio: "inherit" });

  fs.mkdirSync("_doc");
  fs.mkdirSync("src");

  // main.js en la raíz
  const mainPath = path.join(__dirname, "../templates/express-auth/main.js");
  fs.writeFileSync("src/main.js", fs.readFileSync(mainPath, "utf-8"));

  // request.http
  const methodPath = path.join(__dirname, "../templates/express-auth/request.http");
  fs.writeFileSync("_doc/request.http", fs.readFileSync(methodPath, "utf-8"));

  // readme.md
  const readmePath = path.join(__dirname, "../templates/express-auth/readme.md");
  fs.writeFileSync("readme.md", fs.readFileSync(readmePath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../templates/gitignore.txt");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

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
