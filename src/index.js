import path from 'path';
import parse from './parsers.js';
import buildDiff from './treeBuilder.js';
import format from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = parse(buildAbsolutePath(filepath1));
  const data2 = parse(buildAbsolutePath(filepath2));
  const differenceTree = buildDiff(data1, data2);
  return format(differenceTree, outputFormat);
};

export default genDiff;
