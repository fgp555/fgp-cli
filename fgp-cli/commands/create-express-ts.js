const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-express-ts-app") {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`🚀 Creando proyecto Express con TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Instala dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express cors morgan", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node @types/express @types/cors @types/morgan nodemon", { stdio: "inherit" });

  // tsconfig
  fs.writeFileSync("tsconfig.json", `
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
`.trim());

  // src folders
  fs.mkdirSync("src");
  fs.mkdirSync("src/user");

  // server.ts
  const serverPath = path.join(__dirname, "../templates/express-ts/server.ts");
  fs.writeFileSync("server.ts", fs.readFileSync(serverPath, "utf-8"));

  // Controller
  const ctrlPath = path.join(__dirname, "../templates/express-ts/user.controller.ts");
  fs.writeFileSync("src/user/user.controller.ts", fs.readFileSync(ctrlPath, "utf-8"));

  // Routes
  const routesPath = path.join(__dirname, "../templates/express-ts/user.routes.ts");
  fs.writeFileSync("src/user/user.routes.ts", fs.readFileSync(routesPath, "utf-8"));

  // Service
  const servicePath = path.join(__dirname, "../templates/express-ts/user.service.ts");
  fs.writeFileSync("src/user/user.service.ts", fs.readFileSync(servicePath, "utf-8"));

  // Repository
  const repoPath = path.join(__dirname, "../templates/express-ts/user.repository.ts");
  fs.writeFileSync("src/user/user.repository.ts", fs.readFileSync(repoPath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../templates/gitignore.txt");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

  // method.http
  const httpPath = path.join(__dirname, "../templates/method.http");
  fs.writeFileSync("method.http", fs.readFileSync(httpPath, "utf-8"));

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "ts-node server.ts",
    build: "tsc",
    start: "node dist/server.js"
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  // git init
  try {
    execSync("git init", { stdio: "inherit" });
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "init"', { stdio: "inherit" });
    console.log("✅ Repositorio Git inicializado con commit inicial.");
  } catch (err) {
    console.warn("⚠️ No se pudo completar el proceso Git:", err.message);
  }

  console.log(`✅ Proyecto TypeScript generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm run dev`);
};
