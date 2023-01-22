// import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import generateDifference from './treeBuilder.js';
import generateReport from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), path.extname(filepath) !== '' ? filepath : `${filepath}.json`);

const parseFile = (filepath) => parse(fs.readFileSync(filepath), path.extname(filepath));

const genDiff = (filepath1, filepath2, format) => {
  const parsedFile1 = parseFile(buildAbsolutePath(filepath1));
  const parsedFile2 = parseFile(buildAbsolutePath(filepath2));
  const differenceTree = generateDifference(parsedFile1, parsedFile2);
  return generateReport(parsedFile1, parsedFile2, differenceTree, format);
};

export default genDiff;
