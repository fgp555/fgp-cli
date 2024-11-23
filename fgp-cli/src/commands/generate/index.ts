// src/commands/generate/index.ts
import { generateHtmlResource } from './htmlGenerator';
import { generateNestResource } from './nestGenerator';

export function generateResource(type: string, name: string, folderName?: string) {
  if (type === 'html') {
    generateHtmlResource(name);
  } else if (type === 'nest') {
    if (!folderName) {
      console.error('Error: folderName is required for generating a NestJS CRUD.');
      return;
    }
    generateNestResource(name, folderName);
  } else {
    console.error(`Unsupported type: ${type}. Only 'html' and 'nest' are supported.`);
  }
}
