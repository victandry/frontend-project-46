import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';

const generateDifference = (filepath1, filepath2) => {
  const absoluteFilepath1 = path.resolve(process.cwd(), filepath1);
  const absoluteFilepath2 = path.resolve(process.cwd(), filepath2);
  const file1 = parse(fs.readFileSync(absoluteFilepath1), path.extname(absoluteFilepath1));
  const file2 = parse(fs.readFileSync(absoluteFilepath2), path.extname(absoluteFilepath2));

  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);

  const sortedKeys = _.union(file1Keys, file2Keys).sort();

  const filesDifferences = sortedKeys
    .map((key) => {
      if (_.has(file1, key)) {
        const file1KeyOutput = `${key}: ${file1[key]}`;
        if (_.has(file2, key)) {
          return file1[key] === file2[key] ? `    ${file1KeyOutput}` : `  - ${file1KeyOutput}\n  + ${key}: ${file2[key]}`;
        }
        return `  - ${file1KeyOutput}`;
      }
      return `  + ${key}: ${file2[key]}`;
    });

  const differencesOutput = filesDifferences.join('\n');

  return `{\n${differencesOutput}\n}`;
};

export default generateDifference;
