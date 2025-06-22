const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-whatsapp-webhook") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando servidor Webhook para WhatsApp en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa proyecto
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express body-parser cors dotenv", { stdio: "inherit" });

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Webhook de verificación
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "fgp_verify_token";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado correctamente");
    return res.status(200).send(challenge);
  }

  res.status(403).send("❌ Verificación fallida");
});

// Webhook de recepción de mensajes
app.post("/webhook", (req, res) => {
  console.log("📩 Webhook recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(\`✅ Servidor Webhook escuchando en http://localhost:\${PORT}\`);
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
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // method.http
  fs.writeFileSync(
    "method.http",
    `
### Simular verificación webhook
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

  // package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log("✅ Proyecto Webhook de WhatsApp generado.");
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
