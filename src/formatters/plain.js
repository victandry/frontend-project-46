import _ from 'lodash';

const setValueName = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value === String(value) ? `'${value}'` : value;
};

const makePlain = (parsedFile1, parsedFile2, differenceTree) => {
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
