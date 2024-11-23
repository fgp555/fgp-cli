"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlResource = generateHtmlResource;
// src/commands/generate/htmlGenerator.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function generateHtmlResource(name) {
    const targetDir = path.join(process.cwd(), name);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    const files = {
        'index.html': `<html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <script src="script.js"></script>\n  </body>\n</html>`,
        'style.css': `/* Estilos para ${name} */\nbody {\n  font-family: Arial, sans-serif;\n}`,
        'script.js': `// Script para ${name}\nconsole.log('Hello from ${name}!');`
    };
    for (const [fileName, content] of Object.entries(files)) {
        const filePath = path.join(targetDir, fileName);
        fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log(`HTML resource '${name}' generated successfully in ${targetDir}`);
}
