const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-graphql-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto Express + GraphQL en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Instalar dependencias
  execSync("npm init -y", { stdio: "inherit" });
  execSync("npm install express apollo-server-express graphql cors", { stdio: "inherit" });

  // Crea index.js
  fs.writeFileSync(
    "index.js",
    `
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// Schema (definición)
const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => "Hola desde GraphQL 🎉"
  }
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(\`🚀 Servidor listo en http://localhost:4000\${server.graphqlPath}\`)
  );
}

startServer();
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
### GraphQL Playground
GET http://localhost:4000/graphql

### Consulta: hello
POST http://localhost:4000/graphql
Content-Type: application/json

{
  "query": "{ hello }"
}
`.trim()
  );

  // Scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    start: "node index.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log(`✅ Proyecto GraphQL generado.`);
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm start`);
};
