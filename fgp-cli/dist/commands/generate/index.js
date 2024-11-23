"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResource = generateResource;
// src/commands/generate/index.ts
const htmlGenerator_1 = require("./htmlGenerator");
const nestGenerator_1 = require("./nestGenerator");
function generateResource(type, name, folderName) {
    if (type === 'html') {
        (0, htmlGenerator_1.generateHtmlResource)(name);
    }
    else if (type === 'nest') {
        if (!folderName) {
            console.error('Error: folderName is required for generating a NestJS CRUD.');
            return;
        }
        (0, nestGenerator_1.generateNestResource)(name, folderName);
    }
    else {
        console.error(`Unsupported type: ${type}. Only 'html' and 'nest' are supported.`);
    }
}
