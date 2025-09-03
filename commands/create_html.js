const fs = require("fs");
const path = require("path");

module.exports = function (projectName = "fgp-html-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto HTML base en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });

  // index.html
  fs.writeFileSync(
    path.join(projectPath, "index.html"),
    `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main class="container">
    <h1><i class="fas fa-code"></i> Proyecto HTML base</h1>
    <p>¡Bienvenido a tu proyecto creado con <code>fgp create html</code>!</p>
    <button id="btn">Haz clic</button>
  </main>
  <script src="script.js"></script>
</body>
</html>
`.trim()
  );

  // styles.css
  fs.writeFileSync(
    path.join(projectPath, "styles.css"),
    `
body {
  padding: 2rem;
  background-color: #f9f9f9;
}
h1 {
  color: #4e54c8;
}
`.trim()
  );

  // script.js
  fs.writeFileSync(
    path.join(projectPath, "script.js"),
    `
document.getElementById("btn")?.addEventListener("click", () => {
  alert("Hola desde tu proyecto HTML 🚀");
});
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    path.join(projectPath, ".gitignore"),
    `
*.log
.DS_Store
.vscode
.idea
`.trim()
  );

  console.log(`✅ Proyecto HTML generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nAbre index.html en tu navegador`);
};
