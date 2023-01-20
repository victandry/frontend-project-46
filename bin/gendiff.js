#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/formatters/index.js';

program
  .name('gendiff')
  .version('0.0.1', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  })
  .parse(process.argv);
