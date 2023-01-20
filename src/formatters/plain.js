import _ from 'lodash';
import generateDifference, { parseFile, buildAbsolutePath } from '../index.js';

const setValueName = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value === String(value) ? `'${value}'` : value;
};

const makePlain = (filepath1, filepath2) => {
  const parsedFile1 = parseFile(buildAbsolutePath(filepath1));
  const parsedFile2 = parseFile(buildAbsolutePath(filepath2));
  const differenceTreeTemplate = generateDifference(parsedFile1, parsedFile2);
  const differenceTree = _.cloneDeep(differenceTreeTemplate);
  const iter = (file1, file2, tree, defaultPropertyName) => {
    const nodes = Object.entries(tree);
    const lines = nodes
      .map(([key, value]) => {
        const propertyName = defaultPropertyName;
        const changedPropertyName = propertyName !== '' ? `${propertyName}.${key}` : key;
        if (value === 'added') {
          const valueName = setValueName(file2[key]);
          return `Property '${changedPropertyName}' was added with value: ${valueName}`;
        }
        if (value === 'removed') {
          return `Property '${changedPropertyName}' was removed`;
        }
        if (value === 'changed') {
          const valueName = `From ${setValueName(file1[key])} to ${setValueName(file2[key])}`;
          return `Property '${changedPropertyName}' was updated. ${valueName}`;
        }
        if (value === 'unchanged') {
          return '';
        }
        return iter(file1[key], file2[key], tree[key], changedPropertyName);
      })
      .filter((line) => line !== '')
      .join('\n');
    return lines;
  };

  return iter(parsedFile1, parsedFile2, differenceTree, '');
};

export default makePlain;
