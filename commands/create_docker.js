const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-docker-app") {
  let projectPath;
  let isCurrentDir = false;

  // Manejar el caso especial del "."
  if (projectName === ".") {
    projectPath = process.cwd();
    isCurrentDir = true;
  } else {
    projectPath = path.join(process.cwd(), projectName);

    // Solo crear directorio si no es el actual
    fs.mkdirSync(projectPath, { recursive: true });
    process.chdir(projectPath);
  }

  // Validar que existe la carpeta docker
  const templatesPath = path.join(__dirname, "../templates");
  const dockerTemplatesPath = path.join(templatesPath, "docker");

  if (!fs.existsSync(dockerTemplatesPath)) {
    console.error(`❌ Error: No existe la carpeta ${dockerTemplatesPath}`);
    return;
  }

  try {
    // Verificar si hay conflictos antes de copiar
    const dockerContents = fs.readdirSync(dockerTemplatesPath);

    // Copiar cada archivo/carpeta individualmente para mejor control
    dockerContents.forEach((item) => {
      const sourcePath = path.join(dockerTemplatesPath, item);
      const destPath = path.join(projectPath, item);

      if (fs.existsSync(destPath)) {
        console.log(`⚠️  ${item} ya existe, sobrescribiendo...`);
      }

      const stats = fs.statSync(sourcePath);
      if (stats.isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  } catch (error) {
    console.error("❌ Error al copiar archivos:", error.message);
    console.error("Stack:", error.stack);
    return;
  }

  // Resto del código...
  const myAppPath = path.join(projectPath, "my_app");

  if (!fs.existsSync(myAppPath)) {
    console.error(`❌ Error: No existe la carpeta ${myAppPath}`);
    console.log("Contenido actual del directorio:", fs.readdirSync(projectPath));
    return;
  }

  console.log("📦 Instalando dependencias...");
  process.chdir(myAppPath);

  try {
    execSync("npm install", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Error al instalar dependencias:", error.message);
    return;
  }

  process.chdir(projectPath);

  console.log(`\n✅ Proyecto generado.`);
  console.log(`\n👉 Siguientes pasos:`);

  if (isCurrentDir) {
    console.log(`cd my_app && npm run dev`);
    console.log(`\n👉 O desde la raíz:`);
    console.log(`docker-compose up`);
    console.log(`docker compose -p my_stack up`);
  } else {
    console.log(`cd ${projectName}`);
    console.log(`cd my_app && npm run dev`);
    console.log(`\n👉 O desde la raíz:`);
    console.log(`docker-compose up`);
    console.log(`docker compose -p my_stack up`);
  }
};
