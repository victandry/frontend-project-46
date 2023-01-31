import _ from 'lodash';

const stringify = (data, replacer = ' ', spacesCount = 1) => {
  const iter = (obj, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const keys = Object.keys(obj);
    const mappedKeys = keys.flatMap((key) => {
      const keyOutput = `${currentIndent}${key}: `;
      const value = obj[key];
      if (_.isObject(value)) {
        return `${keyOutput}${iter(value, depth + 1)}`;
      }
      return [`${keyOutput}${value}`];
    });
    return ['{', ...mappedKeys, `${bracketIndent}}`].join('\n');
  };
  return _.isObject(data) ? iter(data, 1) : `${data}`;
};

const offset = (str, indent) => {
  if (str.split('\n').length === 1) {
    return str;
  }
  return str
    .split('\n')
    .map((line) => (line !== '{' ? `${indent}${line}` : line))
    .join('\n');
};

const makeStylish = (diffTree) => {
  const addedKeyIndent = '  + ';
  const removedKeyIndent = '  - ';
  const basicIndent = '    ';

  const iter = (tree, depth) => {
    const currentIndent = basicIndent.repeat(depth - 1);
    const nodes = tree
      .map((node) => {
        switch (node.type) {
          case 'removed': {
            return `${currentIndent}${removedKeyIndent}${node.key}: ${offset(stringify(node.value, basicIndent), currentIndent + basicIndent)}`;
          }
          case 'added': {
            return `${currentIndent}${addedKeyIndent}${node.key}: ${offset(stringify(node.value, basicIndent), currentIndent + basicIndent)}`;
          }
          case 'changed': {
            return [
              `${currentIndent}${removedKeyIndent}${node.key}: ${offset(stringify(node.initValue, basicIndent), currentIndent + basicIndent)}`,
              `${currentIndent}${addedKeyIndent}${node.key}: ${offset(stringify(node.finalValue, basicIndent), currentIndent + basicIndent)}`,
            ].join('\n');
          }
          case 'unchanged': {
            return `${currentIndent}${basicIndent}${node.key}: ${stringify(node.value, basicIndent)}`;
          }
          default: {
            return `${currentIndent}${basicIndent}${node.key}: ${stringify(iter(node.children, depth + 1))}`;
          }
        }
      });
    return [
      '{',
      ...nodes,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(diffTree, 1);
};

export default makeStylish;
