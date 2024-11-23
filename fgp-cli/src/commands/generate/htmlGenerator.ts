// src/commands/generate/htmlGenerator.ts
import * as fs from 'fs';
import * as path from 'path';

export function generateHtmlResource(name: string) {
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
