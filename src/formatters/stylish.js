import _ from 'lodash';

const indent = (depth, isFull) => (isFull ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const mappedKeys = Object.entries(data).flatMap(([key, value]) => `${indent(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${mappedKeys.join('\n')}\n${indent(depth, true)}}`;
};

const iter = (tree, depth) => {
  const nodes = tree.flatMap((node) => {
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
        return [
          `${indent(depth, true)}${node.key}: {`,
          `${(iter(node.children, depth + 1))}`,
          `${indent(depth, true)}}`,
        ];
      }
      default:
        throw new Error(`Wrong node type: ${node.type}.`);
    }
  });
  return [...nodes];
};

const formatStylish = (diffTree) => {
  const output = iter(diffTree, 1)
    .map((line) => `${line.split(',').join('\n')}`);
  return `{\n${output.join('\n')}\n}`;
};

export default formatStylish;
