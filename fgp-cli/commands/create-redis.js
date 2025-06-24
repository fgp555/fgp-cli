const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-redis-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Redis en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializar npm y agregar dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install ioredis dotenv", { stdio: "inherit" });

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

async function main() {
  try {
    await redis.set('message', 'Hola desde Redis 🚀');
    const value = await redis.get('message');
    console.log('📦 Valor almacenado:', value);
  } catch (error) {
    console.error('❌ Error con Redis:', error);
  } finally {
    redis.disconnect();
  }
}

main();
`.trim()
  );

  // .env
  fs.writeFileSync(
    ".env",
    `
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // request.http (simulación de operaciones si fuera una API)
  fs.writeFileSync(
    "request.http",
    `
# Este archivo es informativo. Ejecuta: node index.js
`.trim()
  );

  // package.json script
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Redis generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
