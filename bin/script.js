#!/usr/bin/env node

// bin\script.js

const path = require("path");
const pkg = require(path.join(__dirname, "..", "package.json"));
const args = process.argv.slice(2);

// 🧾 Tabla de comandos: [command, subcommand] => archivo a requerir
const createCommands = {
  // Bases de datos
  "mongoose": "db/create_mongoose",
  "mysql": "db/create_mysql", 
  "postgres": "db/create_postgres",
  "redis": "db/create_redis",
  "sqlite": "db/create_sqlite",
  "typeorm": "db/create_typeorm",
  
  // Contenedores
  "docker": "create_docker",
  
  // Express
  "express": "express/create_express",
  "express-auth": "express/create_express-auth", 
  "express-expo": "express/create_express-expo",
  "express-ts": "express/create_express-ts",
  
  // Google Services
  "oauth": "google/create_oauth",
  "google-sheet": "google/create_sheet",
  
  // GraphQL
  "graphql": "create_graphql",
  "graphql-ts": "create_graphql-ts",
  
  // gRPC
  "grpc": "create_grpc",
  "gRPC": "create_grpc",
  
  // HTML
  "html": "create_html",
  "html-tailwind": "create_html-tailwind",
  
  // Mensajería
  "kafka": "create_kafka",
  "mail": "create_mail",
  
  // NPM
  "npm": "create_npm",
  
  // WebSockets
  "socket.io": "create_socketio",
  "socket.io-ts": "create_socketio-ts",
  
  // WhatsApp
  "whatsapp": "create_whatsapp",
  "whatsapp-ts": "create_whatsapp-ts",
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
