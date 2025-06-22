const fs = require("fs");
const path = require("path");

module.exports = function (projectName = "fgp-html-tailwind-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto HTML + Tailwind CDN en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });

  // index.html
  fs.writeFileSync(path.join(projectPath, "index.html"), `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 text-gray-900 p-6">

  <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 text-center">
    <h1 class="text-2xl font-bold text-blue-600">Proyecto Tailwind + HTML</h1>
    <p class="mt-2 text-gray-600">¡Bienvenido a tu plantilla con <code>fgp</code>!</p>
    <button id="btn" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Clic aquí
    </button>
  </div>

  <script src="script.js"></script>
</body>
</html>
`.trim());

  // script.js
  fs.writeFileSync(path.join(projectPath, "script.js"), `
document.getElementById("btn")?.addEventListener("click", () => {
  alert("Tailwind activo 🚀");
});
`.trim());

  // .gitignore
  fs.writeFileSync(path.join(projectPath, ".gitignore"), `
*.log
.DS_Store
.vscode
.idea
`.trim());

  console.log(`✅ Proyecto HTML + Tailwind CDN generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nAbre index.html en tu navegador`);
};
