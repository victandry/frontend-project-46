import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './treeBuilder.js';
import format from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readData = (filepath) => parse(fs.readFileSync(filepath), path.extname(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readData(buildAbsolutePath(filepath1));
  const data2 = readData(buildAbsolutePath(filepath2));
  const diffTree = buildDiff(data1, data2);
  return format(diffTree, outputFormat);
};

export default genDiff;
