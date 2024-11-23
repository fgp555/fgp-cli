#!/usr/bin/env node

import { Command } from 'commander';
import { generateResource } from './commands/generate';

const program = new Command();

program
  .name('fgp')
  .description('Custom CLI for generating resources')
  .version('1.0.0');

program
  .command('g <type> <name> [folderName]')
  .description('Generate a resource (e.g., fgp g html user or fgp g nest crudName folderName)')
  .action((type, name, folderName) => {
    generateResource(type, name, folderName);
  });

program.parse(process.argv);
