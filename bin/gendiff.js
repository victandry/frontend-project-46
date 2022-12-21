#!/usr/bin/env node

import { program } from 'commander';
import generateDifference from '../src/index.js';
import makeStylish from '../src/stylish.js';

program
  .name('gendiff')
  .version('0.0.1', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, type) => {
    if (type === 'stylish') {
      return makeStylish(generateDifference(filepath1, filepath2));
    }
    return 1;
  })
  .parse(process.argv);
