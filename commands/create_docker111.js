// commands\create-docker.js

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-docker-app") {
  const projectPath = path.join(process.cwd(), projectName);
  const templatesPath = path.join(__dirname, "../templates");

  console.log(`🚀 Creando proyecto Docker en ${projectPath}`);

  // Crear directorio del proyecto
  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  console.log("console 1")

  // Copiar toda la carpeta docker de una vez
  const dockerTemplatesPath = path.join(templatesPath, "docker");
  console.log("dockerTemplatesPath", dockerTemplatesPath)
  fs.cpSync(dockerTemplatesPath, ".", { recursive: true, force: true });

  console.log("console 2")


  // Configurar NPM dentro de la carpeta my_app
  const myAppPath = path.join(projectPath, "my_app");

  // OPCIÓN 1: Cambiar directorio y ejecutar npm
  console.log("📦 Instalando dependencias...");
  process.chdir(myAppPath);
  execSync("npm install", { stdio: "inherit" });

  // Volver al directorio raíz del proyecto
  process.chdir(projectPath);

  console.log(`✅ Proyecto generado.`);
  console.log(`\n👉 Siguientes pasos:`);
  console.log(`cd ${projectName}`);
  console.log(`cd my_app && npm run dev`);
  console.log(`# O desde la raíz:`);
  console.log(`docker-compose up`);
};

// OPCIÓN ALTERNATIVA: Usar cwd en execSync

// module.exports = function (projectName = "fgp-docker-app") {
//   const projectPath = path.join(process.cwd(), projectName);
//   const templatesPath = path.join(__dirname, "../templates");

//   console.log(`🚀 Creando proyecto Docker en ${projectPath}`);

//   // Crear directorio del proyecto
//   fs.mkdirSync(projectPath, { recursive: true });
//   process.chdir(projectPath);

//   // Copiar toda la carpeta docker
//   const dockerTemplatesPath = path.join(templatesPath, "docker");
//   fs.cpSync(dockerTemplatesPath, ".", { recursive: true, force: true });

//   // Ejecutar npm install especificando el directorio
//   const myAppPath = path.join(projectPath, "my_app");
//   console.log("📦 Instalando dependencias...");
//   execSync("npm install", {
//     stdio: "inherit",
//     cwd: myAppPath, // Ejecutar desde my_app
//   });

//   console.log(`✅ Proyecto generado.`);
//   console.log(`\n👉 Siguientes pasos:`);
//   console.log(`cd ${projectName}`);
//   console.log(`cd my_app && npm run dev`);
//   console.log(`# O usar Docker:`);
//   console.log(`docker-compose up`);
// };
