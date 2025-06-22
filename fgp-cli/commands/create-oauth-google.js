const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-oauth-google") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto OAuth2.0 con Google en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express passport passport-google-oauth20 express-session dotenv", { stdio: "inherit" });

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar sesión
app.use(session({
  secret: 'fgp_secret',
  resave: false,
  saveUninitialized: true
}));

// Configurar Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get("/", (req, res) => {
  res.send(\`
    <h1>OAuth con Google</h1>
    <a href="/auth/google">Iniciar sesión con Google</a>
  \`);
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  res.send(\`
    <h2>Bienvenido ${"${req.user.displayName}"}</h2>
    <a href="/logout">Cerrar sesión</a>
  \`);
});

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

app.listen(PORT, () => {
  console.log(\`✅ Servidor en http://localhost:\${PORT}\`);
});
`.trim()
  );

  // .env
  fs.writeFileSync(
    ".env",
    `
PORT=3000
GOOGLE_CLIENT_ID=tu_client_id_google
GOOGLE_CLIENT_SECRET=tu_client_secret_google
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

  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto OAuth2.0 con Google creado.`);
  console.log(
    `\n👉 Pasos siguientes:\ncd ${projectName}\n1. Completa GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en .env\n2. npm start`
  );
};
