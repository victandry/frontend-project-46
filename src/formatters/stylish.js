import _ from 'lodash';

const indent = (depth, isFull) => (isFull ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (data, depth) => {
  if (_.isObject(data)) {
    const mappedKeys = Object.entries(data).flatMap(([key, value]) => `${indent(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${mappedKeys.join('\n')}\n${indent(depth, true)}}`;
  }
  return String(data);
};

const iter = (tree, depth) => {
  const nodes = tree
    .map((node) => {
      switch (node.type) {
        case 'removed': {
          return `${indent(depth, false)}- ${node.key}: ${stringify(node.value, depth)}`;
        }
        case 'added': {
          return `${indent(depth, false)}+ ${node.key}: ${stringify(node.value, depth)}`;
        }
        case 'changed': {
          return [
            `${indent(depth, false)}- ${node.key}: ${stringify(node.value1, depth)}`,
            `${indent(depth, false)}+ ${node.key}: ${stringify(node.value2, depth)}`,
          ].join('\n');
        }
        case 'unchanged': {
          return `${indent(depth, true)}${node.key}: ${stringify(node.value, depth)}`;
        }
        case 'nested': {
          return `${indent(depth, true)}${node.key}: ${stringify(iter(node.children, depth + 1), depth)}`;
        }
        default:
          throw new Error(`Wrong node type: ${node.type}.`);
      }
    });
  return `{\n${nodes.join('\n')}\n${indent(depth - 1, true)}}`;
};

const formatStylish = (diffTree) => iter(diffTree, 1);

export default formatStylish;
