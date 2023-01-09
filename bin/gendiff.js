#!/usr/bin/env node

import { program } from 'commander';
// import generateDifference from '../src/index.js';
import makeStylish from '../src/stylish.js';

program
  .name('gendiff')
  .version('0.0.1', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'stylish') {
      console.log(makeStylish(filepath1, filepath2));
    }
  })
  .parse(process.argv);
