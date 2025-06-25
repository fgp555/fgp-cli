const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-kafka-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Kafka en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa y agrega dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install kafkajs dotenv", { stdio: "inherit" });

  // index.js
  fs.writeFileSync(
    "index.js",
    `
const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'fgp-kafka-client',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'fgp-consumer-group' });

const topic = 'fgp-topic';

async function run() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic, fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      console.log('📥 Mensaje recibido:', message.value.toString());
    },
  });

  setInterval(async () => {
    const msg = \`Mensaje enviado en \${new Date().toISOString()}\`;
    await producer.send({
      topic,
      messages: [{ value: msg }],
    });
    console.log('📤 Enviado:', msg);
  }, 3000);
}

run().catch(console.error);
`.trim()
  );

  // .env
  fs.writeFileSync(
    ".env",
    `
KAFKA_BROKER=localhost:9092
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

  // package.json script
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto Kafka generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
