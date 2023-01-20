import _ from 'lodash';
import generateDifference, { parseFile, buildAbsolutePath } from '../index.js';

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

const makeStylish = (filepath1, filepath2) => {
  const parsedFile1 = parseFile(buildAbsolutePath(filepath1));
  const parsedFile2 = parseFile(buildAbsolutePath(filepath2));
  const differenceTreeTemplate = generateDifference(parsedFile1, parsedFile2);
  const differenceTree = _.cloneDeep(differenceTreeTemplate);

  const addedKeyIndent = '  + ';
  const removedKeyIndent = '  - ';
  const basicIndent = '    ';

  const iter = (file1, file2, tree, depth) => {
    const currentIndent = basicIndent.repeat(depth - 1);

    const nodes = Object.entries(tree);

    const lines = nodes
      .map(([key, value]) => {
        switch (value) {
          case 'removed':
            return `${currentIndent}${removedKeyIndent}${key}: ${offset(stringify(file1[key], basicIndent), currentIndent + basicIndent)}`;
          case 'added':
            return `${currentIndent}${addedKeyIndent}${key}: ${offset(stringify(file2[key], basicIndent), currentIndent + basicIndent)}`;
          case 'changed':
            return [
              `${currentIndent}${removedKeyIndent}${key}: ${offset(stringify(file1[key], basicIndent), currentIndent + basicIndent)}`,
              `${currentIndent}${addedKeyIndent}${key}: ${offset(stringify(file2[key], basicIndent), currentIndent + basicIndent)}`,
            ].join('\n');
          case 'unchanged':
            return `${currentIndent}${basicIndent}${key}: ${stringify(file1[key], basicIndent)}`;
          default:
            return `${currentIndent}${basicIndent}${key}: ${stringify(iter(file1[key], file2[key], tree[key], depth + 1))}`;
        }
      });

    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };
  return iter(parsedFile1, parsedFile2, differenceTree, 1);
};

export default makeStylish;
