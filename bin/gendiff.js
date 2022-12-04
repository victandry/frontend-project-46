#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'display help for command');

program.parse(process.argv);

if (!program.args.length) program.help();