import _ from 'lodash';
import { generateDifference, parseFile, buildAbsolutePath } from '../src/index.js';

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
        let propertyName = defaultPropertyName;
        let actionName = '';
        let changedValueName = '';
        propertyName = propertyName !== '' ? `${propertyName}.${key}` : key;
        if (value === 'added') {
          actionName = 'added with value: ';
          changedValueName = setValueName(file2[key]);
        }
        if (value === 'removed') {
          actionName = 'removed';
        }
        if (_.isObject(value) && value !== 'unchanged') {
          return iter(file1[key], file2[key], tree[key], propertyName);
        }
        if (value === 'changed') {
          actionName = 'updated. ';
          changedValueName = `From ${setValueName(file1[key])} to ${setValueName(file2[key])}`;
        }
        if (!_.isObject(value) && value !== 'unchanged') {
          return `Property '${propertyName}' was ${actionName}${changedValueName}`;
        }
        return '';
      })
      .filter((line) => line !== '')
      .join('\n');

    return lines;
  };

  return iter(parsedFile1, parsedFile2, differenceTree, '');
};

export default makePlain;
