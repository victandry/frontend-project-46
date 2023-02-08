import _ from 'lodash';

const indent = (depth, isFull) => (isFull ? '    '.repeat(depth) : '    '.repeat(depth).slice(2));

const stringify = (data, depth) => {
  const iter = (obj, nestLevel) => {
    const mappedKeys = Object.entries(obj).flatMap(([key, value]) => {
      if (_.isObject(value)) {
        return `${indent(nestLevel + 1, true)}${key}: ${iter(value, nestLevel + 1)}`;
      }
      return `${indent(nestLevel + 1, true)}${key}: ${value}`;
    });
    return `{\n${mappedKeys.join('\n')}\n${indent(nestLevel, true)}}`;
  };
  return _.isObject(data) ? iter(data, depth) : data;
};

const formatStylish = (diffTree) => {
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
          default: {
            return `${indent(depth, true)}${node.key}: ${stringify(iter(node.children, depth + 1), depth)}`;
          }
        }
      });
    return `{\n${nodes.join('\n')}\n${indent(depth - 1, true)}}`;
  };
  return iter(diffTree, 1);
};

export default formatStylish;
