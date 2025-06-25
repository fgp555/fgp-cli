// fgp-cli/commands/generate.js

const fs = require("fs");
const path = require("path");

module.exports = function (item) {
  if (!item) {
    console.log("❌ Debes indicar qué generar. Ejemplo: fgp generate .gitignore");
    return;
  }

  const templateMap = {
    ".gitignore": "gitignore.txt",
    "request.http": "request.http",
    ".env": "env.txt",
  };

  if (Object.keys(templateMap).includes(item)) {
    const templateFile = path.join(__dirname, "../templates", templateMap[item]);
    const targetFile = path.join(process.cwd(), item);

    if (fs.existsSync(targetFile)) {
      console.log(`⚠️ Ya existe un archivo ${item} en este proyecto.`);
      return;
    }

    try {
      const content = fs.readFileSync(templateFile, "utf-8");
      fs.writeFileSync(targetFile, content.trimStart());
      console.log(`✅ Archivo ${item} generado desde plantilla.`);
    } catch (err) {
      console.log(`❌ No se pudo leer la plantilla para ${item}: ${err.message}`);
    }
  } else {
    console.log(`❌ No se reconoce qué generar con '${item}'`);
  }
};
