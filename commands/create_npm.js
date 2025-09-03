const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-npm-package") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando paquete NPM en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });

  // Archivos base
  fs.writeFileSync(
    "index.js",
    `
// Paquete FGP NPM

function hello(name = "mundo") {
  return \`Hola, \${name}!\`;
}

module.exports = { hello };
`.trim()
  );

  fs.writeFileSync(
    "readme.md",
    `# ${projectName}

Paquete NPM generado con \`fgp create npm\`.

## Uso

\`\`\`js
const { hello } = require("${projectName}");
console.log(hello("Frank"));
// Hola, Frank!
\`\`\`
`.trim()
  );

  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
.DS_Store
`.trim()
  );

  // Actualizar scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.main = "index.js";
  pkg.module = "index.js";
  pkg.type = "commonjs";
  pkg.files = ["index.js"];
  pkg.keywords = ["fgp", "npm", "cli"];
  pkg.author = "Frank GP";
  pkg.license = "MIT";
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Paquete NPM generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm login\nnpm publish`);
};
