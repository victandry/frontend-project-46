// import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import generateDifference from './treeBuilder.js';
import generateReport from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), path.extname(filepath) !== '' ? filepath : `${filepath}.json`);

const parseFile = (filepath) => parse(fs.readFileSync(filepath), path.extname(filepath));

const genDiff = (filepath1, filepath2, outputFormat) => {
  const data1 = parseFile(buildAbsolutePath(filepath1));
  const data2 = parseFile(buildAbsolutePath(filepath2));
  const differenceTree = generateDifference(data1, data2);
  return generateReport(differenceTree, outputFormat);
};

export default genDiff;
