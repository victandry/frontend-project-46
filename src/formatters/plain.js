import _ from 'lodash';

const setValueName = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value === String(value) ? `'${value}'` : value;
};

const makePlain = (diffTree) => {
  const iter = (tree, defaultPropertyName) => tree
    .map((node) => {
      const propertyName = defaultPropertyName;
      const changedPropertyName = propertyName !== '' ? `${propertyName}.${node.key}` : node.key;
      switch (node.type) {
        case 'added': {
          const valueName = setValueName(node.value);
          return `Property '${changedPropertyName}' was added with value: ${valueName}`;
        }
        case 'removed': {
          return `Property '${changedPropertyName}' was removed`;
        }
        case 'changed': {
          const valueName = `From ${setValueName(node.initValue)} to ${setValueName(node.finalValue)}`;
          return `Property '${changedPropertyName}' was updated. ${valueName}`;
        }
        case 'unchanged': {
          return '';
        }
        default: {
          return iter(node.children, changedPropertyName);
        }
      }
    })
    .filter((line) => line !== '')
    .join('\n');
  return iter(diffTree, '');
};

export default makePlain;
