import _ from 'lodash';

const setValueName = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value === String(value) ? `'${value}'` : value;
};

const makePlain = (diffTree) => {
  const iter = (tree, defaultPropertyName) => {
    const nodes = tree
      .map((node) => {
        const propertyName = defaultPropertyName;
        const changedPropertyName = propertyName !== '' ? `${propertyName}.${node.key}` : node.key;
        if (node.type === 'added') {
          const valueName = setValueName(node.value);
          return `Property '${changedPropertyName}' was added with value: ${valueName}`;
        }
        if (node.type === 'removed') {
          return `Property '${changedPropertyName}' was removed`;
        }
        if (node.type === 'changed') {
          const valueName = `From ${setValueName(node.initValue)} to ${setValueName(node.finalValue)}`;
          return `Property '${changedPropertyName}' was updated. ${valueName}`;
        }
        if (node.type === 'unchanged') {
          return '';
        }
        return iter(node.children, changedPropertyName);
      })
      .filter((line) => line !== '')
      .join('\n');
    return nodes;
  };
  return iter(diffTree, '');
};

export default makePlain;
