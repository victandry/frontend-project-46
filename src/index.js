import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
// import { listeners } from 'process';
// import { equal } from 'assert';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), path.extname(filepath) !== '' ? filepath : `${filepath}.json`);

const parseFile = (filepath) => parse(fs.readFileSync(filepath), path.extname(filepath));

const isObject = (value) => (value === Object(value) && !Array.isArray(value));

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

const generateDifference = (filepath1, filepath2) => {
  const parsedFile1 = parseFile(buildAbsolutePath(filepath1));
  const parsedFile2 = parseFile(buildAbsolutePath(filepath2));

  const basicIndent = '    ';
  const file1Indent = '  - ';
  const file2Indent = '  + ';

  const iter = (file1, file2, depth) => {
    const file1Keys = Object.keys(file1);
    const file2Keys = Object.keys(file2);

    const sortedKeys = _.union(file1Keys, file2Keys).sort();

    const currentIndent = basicIndent.repeat(depth - 1);

    const lines = sortedKeys.flatMap((key) => {
      const value1 = _.has(file1, key) ? file1[key] : undefined;
      const value2 = _.has(file2, key) ? file2[key] : undefined;

      if (_.has(file1, key) && _.has(file2, key)) {
        if (isObject(value1) && isObject(value2)) {
          return `${currentIndent}${basicIndent}${key}: ${iter(value1, value2, depth + 1)}`;
        }
        if (value1 === value2) {
          return `${currentIndent}${basicIndent}${key}: ${value1}`;
        }
        // if (value !== value2 || !(isObject(value1) && isObject(value2)))
        let stringifiedValue1;
        let stringifiedValue2;

        if (isObject(value1)) {
          stringifiedValue1 = stringify(value1, basicIndent, 1)
            .split('\n')
            .map((str) => (str !== '{' ? `${currentIndent + basicIndent}${str}` : str))
            .join('\n');
        } else {
          stringifiedValue1 = stringify(value1, basicIndent, 1);
        }
        if (isObject(value2)) {
          stringifiedValue2 = stringify(value2, basicIndent, 1)
            .split('\n')
            .map((str) => (str !== '{' ? `${currentIndent + basicIndent}${str}` : str))
            .join('\n');
        } else {
          stringifiedValue2 = stringify(value2, basicIndent, 1);
        }

        return [`${currentIndent}${file1Indent}${key}: ${stringifiedValue1}`, `${currentIndent}${file2Indent}${key}: ${stringifiedValue2}`];
      }

      const currentValue = _.has(file1, key) ? value1 : value2;
      const currentFileIndent = _.has(file1, key) ? file1Indent : file2Indent;

      if (isObject(currentValue)) {
        const stringifiedValue = stringify(currentValue, basicIndent, 1)
          .split('\n')
          .map((str) => (str !== '{' ? `${currentIndent + basicIndent}${str}` : str))
          .join('\n');
        return `${currentIndent}${currentFileIndent}${key}: ${stringifiedValue}`;
      }
      return `${currentIndent}${currentFileIndent}${key}: ${currentValue}`;
    });

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };

  return iter(parsedFile1, parsedFile2, 1);
};

export default generateDifference;
