const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-grpc-server") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto gRPC en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install @grpc/grpc-js @grpc/proto-loader", { stdio: "inherit" });

  // Carpeta proto
  fs.mkdirSync("protos");

  fs.writeFileSync(
    "protos/helloworld.proto",
    `
syntax = "proto3";

package helloworld;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
`.trim()
  );

  // server.js
  fs.writeFileSync(
    "server.js",
    `
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "protos", "helloworld.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  const reply = { message: "Hola " + call.request.name };
  callback(null, reply);
}

const server = new grpc.Server();
server.addService(proto.Greeter.service, { SayHello: sayHello });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("✅ Servidor gRPC escuchando en http://localhost:50051");
  server.start();
});
`.trim()
  );

  // client.js
  fs.writeFileSync(
    "client.js",
    `
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "protos", "helloworld.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new proto.Greeter("localhost:50051", grpc.credentials.createInsecure());

client.SayHello({ name: "Frank" }, (err, response) => {
  if (err) return console.error("❌", err);
  console.log("💬 Respuesta:", response.message);
});
`.trim()
  );

  // scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node server.js",
    client: "node client.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto gRPC generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start (servidor)\nnpm run client (cliente)`);
};
