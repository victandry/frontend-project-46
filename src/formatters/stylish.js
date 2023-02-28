import _ from 'lodash';

const indent = (depth, isFull) => (isFull ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data).flatMap(([key, value]) => `${indent(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${output.join('\n')}\n${indent(depth, true)}}`;
};

const iter = (tree, depth) => tree.flatMap((node) => {
  switch (node.type) {
    case 'removed': {
      return `${indent(depth, false)}- ${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'added': {
      return `${indent(depth, false)}+ ${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'changed': {
      const output1 = `${indent(depth, false)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const output2 = `${indent(depth, false)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${output1}\n${output2}`;
    }
    case 'unchanged': {
      return `${indent(depth, true)}${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'nested': {
      const output = iter(node.children, depth + 1).join('\n');
      return `${indent(depth, true)}${node.key}: {\n${output}\n${indent(depth, true)}}`;
    }
    default:
      throw new Error(`Wrong node type: ${node.type}.`);
  }
});

const formatStylish = (diffTree) => {
  const output = iter(diffTree, 1);
  return `{\n${output.join('\n')}\n}`;
};

export default formatStylish;
