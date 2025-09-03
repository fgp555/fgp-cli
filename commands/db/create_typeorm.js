const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-express-ts-app") {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`🚀 Creando proyecto Express con TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  // Después de cambiar de directorio
  process.chdir(projectPath);

  // Inicializa proyecto y luego crea carpetas
  execSync("npm init -y", { stdio: "inherit" });

  fs.mkdirSync("src");
  fs.mkdirSync("src/user");
  fs.mkdirSync("src/user/entities");
  fs.mkdirSync("scripts");
  fs.mkdirSync("src/socket");
  fs.mkdirSync("src/config");
  fs.mkdirSync("_docs");

  // Instala dependencias
  execSync("npm install express cors morgan dotenv", { stdio: "inherit" });
  execSync("npm install -D @types/express @types/morgan @types/cors nodemon", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node", { stdio: "inherit" });
  execSync("npm install typeorm reflect-metadata pg", { stdio: "inherit" });

  // .env
  const envPath = path.join(__dirname, "../../templates/express-ts/env.db.txt");
  fs.writeFileSync(".env", fs.readFileSync(envPath, "utf-8"));

  // tsconfig.json
  const tsconfigPath = path.join(__dirname, "../../templates/express-ts/tsconfig.json");
  fs.writeFileSync("tsconfig.json", fs.readFileSync(tsconfigPath, "utf-8"));

  // nodemon.json
  const nodemonPath = path.join(__dirname, "../../templates/express-ts/nodemon.json");
  fs.writeFileSync("nodemon.json", fs.readFileSync(nodemonPath, "utf-8"));

  // clean-dist.js
  const cleanDistPath = path.join(__dirname, "../../templates/express-ts/scripts/clean-dist.js");
  fs.writeFileSync("scripts/clean-dist.js", fs.readFileSync(cleanDistPath, "utf-8"));

  // main.ts
  const mainPath = path.join(__dirname, "../../templates/express-ts/main.db.ts");
  fs.writeFileSync("src/main.ts", fs.readFileSync(mainPath, "utf-8"));

  // app.ts
  const appPath = path.join(__dirname, "../../templates/express-ts/app.ts");
  fs.writeFileSync("src/app.ts", fs.readFileSync(appPath, "utf-8"));

  // socket
  const socketPath = path.join(__dirname, "../../templates/express-ts/socket/index.ts");
  fs.writeFileSync("src/socket/index.ts", fs.readFileSync(socketPath, "utf-8"));

  // Routes
  const routesPath = path.join(__dirname, "../../templates/express-ts/user/user.routes.ts");
  fs.writeFileSync("src/user/user.routes.ts", fs.readFileSync(routesPath, "utf-8"));

  // Controller
  const ctrlPath = path.join(__dirname, "../../templates/express-ts/user/user.controller.ts");
  fs.writeFileSync("src/user/user.controller.ts", fs.readFileSync(ctrlPath, "utf-8"));

  // Service
  const servicePath = path.join(__dirname, "../../templates/express-ts/user/user.service.db.ts");
  fs.writeFileSync("src/user/user.service.ts", fs.readFileSync(servicePath, "utf-8"));

  // entity
  const entityPath = path.join(__dirname, "../../templates/express-ts/user/entities/user.entity.ts");
  fs.writeFileSync("src/user/entities/user.entity.ts", fs.readFileSync(entityPath, "utf-8"));

  // data-source
  const dataSourcePath = path.join(__dirname, "../../templates/express-ts/config/data-source.ts");
  fs.writeFileSync("src/config/data-source.ts", fs.readFileSync(dataSourcePath, "utf-8"));

  // envs.ts
  const envsPath = path.join(__dirname, "../../templates/express-ts/config/envs.ts");
  fs.writeFileSync("src/config/envs.ts", fs.readFileSync(envsPath, "utf-8"));

  // .gitignore
  const gitignorePath = path.join(__dirname, "../../templates/gitignore.txt");
  fs.writeFileSync(".gitignore", fs.readFileSync(gitignorePath, "utf-8"));

  // request.http
  const httpPath = path.join(__dirname, "../../templates/request.http");
  fs.writeFileSync("_docs/request.http", fs.readFileSync(httpPath, "utf-8"));

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    "start:dev": "npx ts-node-dev --respawn src/main.ts",
    build: "node scripts/clean-dist.js && tsc",
    dev: "npx nodemon",
    start: "node dist/main.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto TypeScript generado.`);
  console.log(`\n👉 Siguiente paso:\ncd ${projectName}\nnpm run dev`);
};
