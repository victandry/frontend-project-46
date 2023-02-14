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

const getPropertyName = (propertyName, key) => (propertyName !== '' ? `${propertyName}.${key}` : key);

const iter = (tree, propertyName) => tree.map((node) => {
  switch (node.type) {
    case 'added': {
      return `Property '${getPropertyName(propertyName, node.key)}' was added with value: ${stringify(node.value)}`;
    }
    case 'removed': {
      return `Property '${getPropertyName(propertyName, node.key)}' was removed`;
    }
    case 'changed': {
      return `Property '${getPropertyName(propertyName, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    }
    case 'unchanged': {
      return '';
    }
    case 'nested': {
      return iter(node.children, getPropertyName(propertyName, node.key));
    }
    default: {
      throw new Error(`Wrong node type: ${node.type}.`);
    }
  }
})
  .filter((line) => line !== '')
  .join('\n');

const formatPlain = (diffTree) => iter(diffTree, '');

export default formatPlain;
