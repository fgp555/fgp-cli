// fgp-cli/commands/generate.js

const fs = require("fs");
const path = require("path");

module.exports = function (item) {
  if (!item) {
    console.log("❌ Debes indicar qué generar. Ejemplo: fgp generate .gitignore");
    return;
  }

  // Componente React
  if (item === "component") {
    const name = process.argv[4];
    const baseTarget = process.argv[5] || "."; // Carpeta destino base (ej: src/components)
    const target = path.join(baseTarget, name); // Siempre crea una carpeta con el nombre del componente

    if (!name) {
      console.log("❌ Debes indicar el nombre del componente. Ejemplo: fgp generate component UserPage src/components");
      return;
    }

    const tsxContent = `import "./${name}.scss";

export const ${name} = () => {
  return (
    <div className="${name}">
      {/* ${name} component */}
    </div>
  );
};
`;

    const scssContent = `// ${name}.scss

.${name} {
  padding: 1rem;
  background-color: #f9f9f9;
}
`;

    try {
      fs.mkdirSync(target, { recursive: true });
      fs.writeFileSync(path.join(target, `${name}.tsx`), tsxContent);
      fs.writeFileSync(path.join(target, `${name}.scss`), scssContent);
      console.log(`✅ Componente ${name} generado en ${target}`);
    } catch (err) {
      console.log(`❌ Error al generar componente: ${err.message}`);
    }

    return;
  }

  // Archivos desde plantillas (como .gitignore, .env, etc.)
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

    return;
  }

  console.log(`❌ No se reconoce qué generar con '${item}'`);
};
