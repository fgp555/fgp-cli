const fs = require("fs");
const path = require("path");

module.exports = function (name, targetPath = ".") {
  if (!name) {
    console.log("❌ Debes indicar un nombre de módulo. Ej: fgp generate module user ./src/user");
    return;
  }

  const baseDir = path.join(process.cwd(), targetPath);
  const dtosDir = path.join(baseDir, "dtos-entities");

  fs.mkdirSync(dtosDir, { recursive: true });

  const files = [
    { name: `${name}.controller.ts`, content: `export class ${capitalize(name)}Controller {}` },
    { name: `${name}.routes.ts`, content: `// Rutas de ${name}` },
    { name: `${name}.repository.ts`, content: `export class ${capitalize(name)}Repository {}` },
    { name: `${name}.service.ts`, content: `export class ${capitalize(name)}Service {}` },
    { name: path.join("dtos-entities", `${name}.dto.ts`), content: `export class ${capitalize(name)}Dto {}` },
    { name: path.join("dtos-entities", `${name}.entity.ts`), content: `export class ${capitalize(name)}Entity {}` },
  ];

  files.forEach(({ name: fileName, content }) => {
    const filePath = path.join(baseDir, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${fileName} creado.`);
    } else {
      console.log(`⚠️  ${fileName} ya existe.`);
    }
  });

  console.log("✅ Módulo generado.");
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
