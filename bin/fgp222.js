#!/usr/bin/env node

const path = require("path");
const pkg = require(path.join(__dirname, "..", "package.json"));
const args = process.argv.slice(2);

// 🧾 Tabla de comandos: [command, subcommand] => archivo a requerir
const createCommands = {
  "docker": "create-docker",
  "express-auth": "create-express-auth",
  "express-expo": "create-express-expo",
  "express-ts": "create-express-ts",
  "express": "create-express",
  "google-sheet": "create-google-sheet",
  "graphql-ts": "create-graphql-ts",
  "graphql": "create-graphql",
  "grpc": "create-grpc",
  "gRPC": "create-grpc",
  "html-tailwind": "create-html-tailwind",
  "html": "create-html",
  "kafka": "create-kafka",
  "mail": "create-mail",
  "mongoose": "create-mongoose",
  "mysql": "create-mysql",
  "npm": "create-npm",
  "oauth": "create-oauth-google",
  "postgres": "create-postgres",
  "redis": "create-redis",
  "socket.io-ts": "create-socketio-ts",
  "socket.io": "create-socketio",
  "sqlite": "create-sqlite",
  "typeorm": "create-typeorm",
  "whatsapp-ts": "create-whatsapp-ts",
  "whatsapp": "create-whatsapp",
};

const helpMessage = `
${pkg.name} v${pkg.version}

Generadores:
  fgp generate .env
  fgp generate .gitignore
  fgp generate component ProductPage src/components
  fgp generate module user
  fgp generate request.http

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
