#!/usr/bin/env node

import { program } from 'commander';
import generateDifference from '../src/index.js';

program
  .name('gendiff')
  .version('0.0.1', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(generateDifference(filepath1, filepath2)))
  .parse(process.argv);
