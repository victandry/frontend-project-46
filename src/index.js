import * as path from 'path';
import parse from './parsers.js';
import generateDifference from './treeBuilder.js';
import generateReport from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = parse(buildAbsolutePath(filepath1));
  const data2 = parse(buildAbsolutePath(filepath2));
  const differenceTree = generateDifference(data1, data2);
  return generateReport(differenceTree, outputFormat);
};

export default genDiff;
