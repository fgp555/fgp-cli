```sh
nest-cli/
├── src/
│   ├── commands/
│   │   ├── generate.ts
│   ├── index.ts
├── package.json
├── tsconfig.json
```

```sh
npm install -g fgp

fgp g res user

```
```sh
# 1. Instala Plop.js
npm install --save-dev plop

# build
npm run build

# install
npm link

npm unlink fgp-cli
npm unlink -g fgp-cli

npm list -g fgp-cli
npm list -g
# run
fgp g res user

```

```sh
# Crear un recurso HTML
fgp g html user user-folder

# Crear un módulo de NestJS
fgp g nest moduleName folderName

# Crear un CRUD de Express
fgp g express crudName folderName
