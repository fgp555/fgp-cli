const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-express-ts-app") {
  const projectPath = path.join(process.cwd(), projectName);

  console.log(`🚀 Creando proyecto Express con TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa proyecto con TypeScript
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express cors morgan", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node @types/express @types/cors @types/morgan", {
    stdio: "inherit",
  });

  // Crea tsconfig.json
  fs.writeFileSync(
    "tsconfig.json",
    `
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
`.trim()
  );

  // Estructura de carpetas
  fs.mkdirSync("src");
  fs.mkdirSync("src/routes");
  fs.mkdirSync("src/controllers");

  // server.ts
  fs.writeFileSync(
    "src/server.ts",
    `
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('✅ Servidor listo en http://localhost:3000');
});
`.trim()
  );

  // routes/user.routes.ts
  fs.writeFileSync(
    "src/routes/user.routes.ts",
    `
import { Router } from 'express';
import * as controller from '../controllers/user.controller';

const router = Router();

router.get('/', controller.findAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
`.trim()
  );

  // controllers/user.controller.ts
  fs.writeFileSync(
    "src/controllers/user.controller.ts",
    `
interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];
let id = 1;

export const findAll = (_req: any, res: any) => res.json(users);

export const create = (req: any, res: any) => {
  const user: User = { id: id++, ...req.body };
  users.push(user);
  res.status(201).json(user);
};

export const update = (req: any, res: any) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ msg: 'No encontrado' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
};

export const remove = (req: any, res: any) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ msg: 'Eliminado' });
};
`.trim()
  );

  // package.json: script para compilar y ejecutar
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "ts-node src/server.ts",
    build: "tsc",
    start: "node dist/server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  // Crea .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
        node_modules
        dist
        .env
        *.log
        *.local
        .vscode
        .idea
        .DS_Store
        `.trim()
  );

  // Crea method.http
  fs.writeFileSync(
    "method.http",
`
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
`.trim()
  );

  console.log(`✅ Proyecto TypeScript generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm run dev`);
};
