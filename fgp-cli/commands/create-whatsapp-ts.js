const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-whatsapp-ts-webhook") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando servidor WhatsApp Webhook con TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa y agrega dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express cors body-parser dotenv", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node @types/express @types/cors @types/body-parser", {
    stdio: "inherit",
  });

  // tsconfig.json
  fs.writeFileSync(
    "tsconfig.json",
    `
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
`.trim()
  );

  // Estructura
  fs.mkdirSync("src");

  // src/server.ts
  fs.writeFileSync(
    "src/server.ts",
    `
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'fgp_verify_token';

app.use(cors());
app.use(bodyParser.json());

app.get("/webhook", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado correctamente");
    return res.status(200).send(challenge);
  }

  res.status(403).send("❌ Verificación fallida");
});

app.post("/webhook", (req: Request, res: Response) => {
  console.log("📩 Webhook recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(\`✅ Servidor WhatsApp Webhook en http://localhost:\${PORT}\`);
});
`.trim()
  );

  // .env
  fs.writeFileSync(
    ".env",
    `
PORT=3000
VERIFY_TOKEN=fgp_verify_token
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
dist
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // request.http
  fs.writeFileSync(
    "request.http",
    `
### Verificar Webhook
GET http://localhost:3000/webhook?hub.mode=subscribe&hub.verify_token=fgp_verify_token&hub.challenge=12345

### Simular mensaje recibido
POST http://localhost:3000/webhook
Content-Type: application/json

{
  "entry": [
    {
      "id": "whatsapp_business_account_id",
      "changes": [
        {
          "value": {
            "messages": [
              {
                "from": "whatsapp_user_id",
                "text": { "body": "Hola!" },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
`.trim()
  );

  // Scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "ts-node src/server.ts",
    build: "tsc",
    start: "node dist/server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log("✅ Proyecto WhatsApp Webhook con TypeScript generado.");
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm run dev`);
};
