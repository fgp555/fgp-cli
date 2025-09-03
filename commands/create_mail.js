const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-mail-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + Nodemailer en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express nodemailer cors dotenv", { stdio: "inherit" });

  // .env
  fs.writeFileSync(
    ".env",
    `
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_contraseña
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
.env
*.log
`.trim()
  );

  // mailer.js
  fs.writeFileSync(
    "mailer.js",
    `
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendMail(to, subject, html) {
  return transporter.sendMail({
    from: \`"FGP Mail" <\${process.env.SMTP_USER}>\`,
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
`.trim()
  );

  // index.js
  fs.writeFileSync(
    "index.js",
    `
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sendMail } = require("./mailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const info = await sendMail(to, subject, html);
    res.json({ msg: "Correo enviado", messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(\`✅ Servidor de correo en http://localhost:\${process.env.PORT}\`);
});
`.trim()
  );

  // request.http
  fs.writeFileSync(
    "request.http",
    `
### Enviar correo
POST http://localhost:3000/send
Content-Type: application/json

{
  "to": "destinatario@example.com",
  "subject": "Hola desde FGP Mail",
  "html": "<h1>Bienvenido</h1><p>Correo enviado exitosamente</p>"
}
`.trim()
  );

  // script
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto FGP Mail generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\n1. Edita .env con tus credenciales\n2. npm start`);
};
