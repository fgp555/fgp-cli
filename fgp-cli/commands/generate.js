const fs = require("fs");
const path = require("path");

module.exports = function (item) {
  if (!item) {
    console.log("❌ Debes indicar qué generar. Ejemplo: fgp generate .gitignore");
    return;
  }

  if (item === ".gitignore") {
    const content = `
node_modules
dist
.env
*.log
*.local
.vscode
.idea
.DS_Store
`;
    const filePath = path.join(process.cwd(), ".gitignore");

    if (fs.existsSync(filePath)) {
      console.log("⚠️ Ya existe un archivo .gitignore en este proyecto.");
      return;
    }

    fs.writeFileSync(filePath, content.trimStart());
    console.log("✅ Archivo .gitignore generado.");
  }

  else if (item === "method.http") {
    const filePath = path.join(process.cwd(), "method.http");

    if (fs.existsSync(filePath)) {
      console.log("⚠️ Ya existe un archivo method.http en este proyecto.");
      return;
    }

    const content = `
### Obtener todos los usuarios
GET http://localhost:3000/api/users
Content-Type: application/json

### Crear un nuevo usuario
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Juan",
  "email": "juan@example.com"
}

### Actualizar un usuario
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "Juan Actualizado"
}

### Eliminar un usuario
DELETE http://localhost:3000/api/users/1
`;
    fs.writeFileSync(filePath, content.trimStart());
    console.log("✅ Archivo method.http generado.");
  }

  else {
    console.log(`❌ No se reconoce qué generar con '${item}'`);
  }
};
