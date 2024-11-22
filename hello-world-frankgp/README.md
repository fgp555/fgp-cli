Crear y publicar tu propia librería en npm

1. Prepara tu entorno

```bash
node -v
npm -v
```

4. Configura el archivo .gitignore

```bash
node_modules
```

5. Publica tu librería

```bash
npm login

npm publish
```

6. Verifica tu librería

https://www.npmjs.com/package/frankgp

7. Actualiza tu librería (opcional)

```bash
npm version patch
npm publish
```

Buenas prácticas
Escribe pruebas unitarias (usando herramientas como Jest).
Proporciona documentación clara en tu archivo README.md.
Sigue las convenciones de semántica de versiones (SemVer).
¡Con esto ya tienes tu librería publicada en npm! 🚀

```bash
frankgp/
├── src/
│   └── index.js         # Código fuente (ESM por defecto)
├── dist/
│   ├── cjs/             # Salida para CommonJS
│   ├── esm/             # Salida para ES Modules
├── package.json
└── README.md
```

3. Usa un empaquetador o transpilador

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env

npm run build
npm run build2

```

Solución 3: Usa tsup como alternativa moderna

```bash
npm install --save-dev tsup


npm install --save-dev typescript
npx tsc --init

npm run build

```

```js
"scripts": {
  "build": "tsup src/index.js --format cjs,esm --dts"
}
```

6. Uso de la librería

```js
// Con ES Modules:
import { saludar } from "frankgp";
console.log(saludar("Frank"));

// Con CommonJS:
const { saludar } = require("frankgp");
console.log(saludar("Frank"));
```
