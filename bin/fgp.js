#!/usr/bin/env node

const path = require("path");
const pkg = require(path.join(__dirname, "..", "package.json"));
const args = process.argv.slice(2);

const helpMessage = `
${pkg.name} v${pkg.version}

Generadores:
  fgp generate module [nombre]
  fgp generate .env
  fgp generate .gitignore
  fgp generate request.http

Proyectos:
  fgp create express [nombre]
  fgp create express-ts [nombre]
  fgp create typeorm [nombre]
  fgp create mongoose [nombre]
  fgp create postgres [nombre]
  fgp create mysql [nombre]
  fgp create sqlite [nombre]
  fgp create socket.io [nombre]
  fgp create socket.io-ts [nombre]
  fgp create graphql [nombre]
  fgp create graphql-ts [nombre]
  fgp create whatsapp [nombre]
  fgp create whatsapp-ts [nombre]
  fgp create html [nombre]
  fgp create html-tailwind [nombre]
  fgp create docker [nombre]
  fgp create redis [nombre]
  fgp create kafka [nombre]
  fgp create oauth [nombre]
  fgp create mail [nombre]
  fgp create npm [nombre]
  fgp create grpc [nombre]
`;

if (args[0] === "--help" || args[0] === "-h") {
  console.log(helpMessage);
} else if (args[0] === "--version" || args[0] === "-v") {
  console.log(`${pkg.name} v${pkg.version}`);
} else if (args[0] === "create" && args[1] === "express") {
  const projectName = args[2] || "fgp-express-app";
  require("../commands/create-express")(projectName);
} else if (args[0] === "create" && args[1] === "express-ts") {
  const projectName = args[2] || "fgp-express-ts-app";
  require("../commands/create-express-ts")(projectName);
} else if (args[0] === "create" && args[1] === "typeorm") {
  const projectName = args[2] || "fgp-typeorm-app";
  require("../commands/create-typeorm")(projectName);
} else if (args[0] === "create" && args[1] === "socket.io") {
  const projectName = args[2] || "fgp-socketio-app";
  require("../commands/create-socketio")(projectName);
} else if (args[0] === "create" && args[1] === "socket.io-ts") {
  const projectName = args[2] || "fgp-socketio-ts-app";
  require("../commands/create-socketio-ts")(projectName);
} else if (args[0] === "generate" || args[0] === "g") {
  const item = args[1];
  if (item === "module") {
    const moduleName = args[2];
    const target = args[3] || `./${moduleName}`;
    require("../commands/generate-module")(moduleName, target);
  } else {
    require("../commands/generate")(item);
  }
} else if (args[0] === "create" && args[1] === "graphql") {
  const projectName = args[2] || "fgp-graphql-app";
  require("../commands/create-graphql")(projectName);
} else if (args[0] === "create" && args[1] === "graphql-ts") {
  const projectName = args[2] || "fgp-graphql-ts-app";
  require("../commands/create-graphql-ts")(projectName);
} else if (args[0] === "create" && args[1] === "whatsapp") {
  const projectName = args[2] || "fgp-whatsapp-webhook";
  require("../commands/create-whatsapp")(projectName);
} else if (args[0] === "create" && args[1] === "whatsapp-ts") {
  const projectName = args[2] || "fgp-whatsapp-ts-webhook";
  require("../commands/create-whatsapp-ts")(projectName);
} else if (args[0] === "create" && args[1] === "html") {
  const projectName = args[2] || "fgp-html-app";
  require("../commands/create-html")(projectName);
} else if (args[0] === "create" && args[1] === "html-tailwind") {
  const projectName = args[2] || "fgp-html-tailwind-app";
  require("../commands/create-html-tailwind")(projectName);
} else if (args[0] === "create" && args[1] === "docker") {
  const projectName = args[2] || "fgp-docker-node";
  require("../commands/create-docker")(projectName);
} else if (args[0] === "create" && args[1] === "redis") {
  const projectName = args[2] || "fgp-redis-app";
  require("../commands/create-redis")(projectName);
} else if (args[0] === "create" && args[1] === "kafka") {
  const projectName = args[2] || "fgp-kafka-app";
  require("../commands/create-kafka")(projectName);
} else if (args[0] === "create" && args[1] === "oauth") {
  const projectName = args[2] || "fgp-oauth";
  require("../commands/create-oauth-google")(projectName);
} else if (args[0] === "create" && args[1] === "mongoose") {
  const projectName = args[2] || "fgp-mongoose-app";
  require("../commands/create-mongoose")(projectName);
} else if (args[0] === "create" && args[1] === "postgres") {
  const projectName = args[2] || "fgp-postgres-app";
  require("../commands/create-postgres")(projectName);
} else if (args[0] === "create" && args[1] === "mysql") {
  const projectName = args[2] || "fgp-mysql-app";
  require("../commands/create-mysql")(projectName);
} else if (args[0] === "create" && args[1] === "sqlite") {
  const projectName = args[2] || "fgp-sqlite-app";
  require("../commands/create-sqlite")(projectName);
} else if (args[0] === "create" && args[1] === "mail") {
  const projectName = args[2] || "fgp-mail-app";
  require("../commands/create-mail")(projectName);
} else if (args[0] === "create" && args[1] === "npm") {
  const projectName = args[2] || "fgp-npm-package";
  require("../commands/create-npm")(projectName);
} else if (args[0] === "create" && (args[1] === "grpc" || args[1] === "gRPC")) {
  const projectName = args[2] || "fgp-grpc-server";
  require("../commands/create-grpc")(projectName);
} else {
  console.log(`❌ Comando no reconocido.`);
  console.log(helpMessage);
}
