#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const program = new commander_1.Command();
program
    .name('fgp')
    .description('Custom CLI for generating resources')
    .version('1.0.0');
program
    .command('g <type> <name> [folderName]')
    .description('Generate a resource (e.g., fgp g html user or fgp g nest crudName folderName)')
    .action((type, name, folderName) => {
    (0, generate_1.generateResource)(type, name, folderName);
});
program.parse(process.argv);
