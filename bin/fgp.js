#!/usr/bin/env node

const path = require("path");
const pkg = require(path.join(__dirname, "..", "package.json"));
const args = process.argv.slice(2);

// 🧾 Tabla de comandos: [command, subcommand] => archivo a requerir
const createCommands = {
  express: "create-express",
  "express-ts": "create-express-ts",
  "express-auth": "create-express-auth",
  typeorm: "create-typeorm",
  "google-sheet": "create-google-sheet",
  "socket.io": "create-socketio",
  "socket.io-ts": "create-socketio-ts",
  graphql: "create-graphql",
  "graphql-ts": "create-graphql-ts",
  whatsapp: "create-whatsapp",
  "whatsapp-ts": "create-whatsapp-ts",
  html: "create-html",
  "html-tailwind": "create-html-tailwind",
  docker: "create-docker",
  redis: "create-redis",
  kafka: "create-kafka",
  oauth: "create-oauth-google",
  mongoose: "create-mongoose",
  postgres: "create-postgres",
  mysql: "create-mysql",
  sqlite: "create-sqlite",
  mail: "create-mail",
  npm: "create-npm",
  grpc: "create-grpc",
  gRPC: "create-grpc",
};

const helpMessage = `
${pkg.name} v${pkg.version}

Generadores:
  fgp generate .env
  fgp generate .gitignore
  fgp generate request.http
  fgp generate module user
  fgp generate component ProductPage src/components

Proyectos:
${Object.keys(createCommands)
  .map((cmd) => `  fgp create ${cmd} [nombre]`)
  .join("\n")}
`;

function printHelp() {
  console.log(helpMessage);
}

function printVersion() {
  console.log(`${pkg.name} v${pkg.version}`);
}

// 🧠 Comando principal
function main() {
  const [cmd, subcmd, name] = args;

  if (cmd === "--help" || cmd === "-h") return printHelp();
  if (cmd === "--version" || cmd === "-v") return printVersion();

  if (cmd === "create") {
    const file = createCommands[subcmd];
    if (!file) {
      console.log(`❌ Comando 'create ${subcmd}' no reconocido.\n`);
      return printHelp();
    }
    const projectName = name || `fgp-${subcmd.replace(/[.]/g, "-")}-app`;
    require(`../commands/${file}`)(projectName);
    return;
  }

  if (cmd === "generate" || cmd === "g") {
    if (subcmd === "module") {
      const moduleName = args[2];
      const target = args[3] || `./${moduleName}`;
      return require("../commands/generate-module")(moduleName, target);
    } else {
      return require("../commands/generate")(subcmd);
    }
  }

  console.log(`❌ Comando no reconocido.\n`);
  printHelp();
}

main();
