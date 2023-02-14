import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const formatPlain = (diffTree) => {
  const iter = (tree, defaultPropertyName) => tree
    .map((node) => {
      const propertyName = defaultPropertyName;
      const changedPropertyName = propertyName !== '' ? `${propertyName}.${node.key}` : node.key;
      switch (node.type) {
        case 'added': {
          const valueName = stringify(node.value);
          return `Property '${changedPropertyName}' was added with value: ${valueName}`;
        }
        case 'removed': {
          return `Property '${changedPropertyName}' was removed`;
        }
        case 'changed': {
          const valueName = `From ${stringify(node.value1)} to ${stringify(node.value2)}`;
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

export default formatPlain;
