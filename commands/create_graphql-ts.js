const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function (projectName = "fgp-graphql-ts-app") {
  const projectPath = path.join(process.cwd(), projectName);
  console.log(`🚀 Creando proyecto GraphQL + TypeScript en ${projectPath}`);

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Inicializa proyecto
  execSync("npm init -y", { stdio: "inherit" });

  // Instala dependencias
  execSync("npm install express apollo-server-express graphql cors", { stdio: "inherit" });
  execSync("npm install -D typescript ts-node @types/node @types/express @types/cors", { stdio: "inherit" });

  // tsconfig.json
  fs.writeFileSync(
    "tsconfig.json",
    `
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
`.trim()
  );

  // Estructura de carpetas
  fs.mkdirSync("src");

  // src/server.ts
  fs.writeFileSync(
    "src/server.ts",
    `
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(\`🚀 Servidor GraphQL listo en http://localhost:4000\${server.graphqlPath}\`);
  });
}

startServer();
`.trim()
  );

  // src/schema.ts
  fs.writeFileSync(
    "src/schema.ts",
    `
import { gql } from 'apollo-server-express';

export const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;
`.trim()
  );

  // src/resolvers.ts
  fs.writeFileSync(
    "src/resolvers.ts",
    `
export const resolvers = {
  Query: {
    hello: () => "Hola desde GraphQL con TypeScript 🎉"
  }
};
`.trim()
  );

  // .gitignore
  fs.writeFileSync(
    ".gitignore",
    `
node_modules
dist
.env
*.log
.vscode
.idea
.DS_Store
`.trim()
  );

  // request.http
  fs.writeFileSync(
    "request.http",
    `
### Consulta GraphQL
POST http://localhost:4000/graphql
Content-Type: application/json

{
  "query": "{ hello }"
}
`.trim()
  );

  // Scripts en package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = {
    dev: "ts-node src/server.ts",
    build: "tsc",
    start: "node dist/server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

  console.log("✅ Proyecto GraphQL con TypeScript generado.");
  console.log(`\n👉 Pasos siguientes:\ncd ${projectName}\nnpm run dev`);
};
