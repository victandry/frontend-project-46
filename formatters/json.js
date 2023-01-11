import _ from 'lodash';
import { generateDifference, parseFile, buildAbsolutePath } from '../src/index.js';

const makeJson = (filepath1, filepath2) => {
  const parsedFile1 = parseFile(buildAbsolutePath(filepath1));
  const parsedFile2 = parseFile(buildAbsolutePath(filepath2));
  const differenceTreeTemplate = generateDifference(parsedFile1, parsedFile2);
  const differenceTree = _.cloneDeep(differenceTreeTemplate);

  const iter = (tree) => {
    const nodes = Object.entries(tree);

    const lines = nodes
      .map(([key, value]) => {
        if (_.isObject(value)) {
          return `"${key}":${iter(tree[key])}`;
        }
        return `"${key}":"${value}"`;
      });

    return [
      '{',
      [...lines].join(','),
      '}',
    ].join('');
  };

  return iter(differenceTree);
};

export default makeJson;
