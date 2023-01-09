import _ from 'lodash';
// import { listeners } from 'process';
// import { equal } from 'assert';

const isObject = (value) => (value === Object(value) && !Array.isArray(value));

const generateDifference = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);

  const sortedKeys = _.union(file1Keys, file2Keys).sort();

  const keyStates = sortedKeys
    .reduce((acc, key) => {
      if (!_.has(file1, key)) {
        acc[key] = 'added';
        return acc;
      }
      if (!_.has(file2, key)) {
        acc[key] = 'removed';
        return acc;
      }
      if (isObject(file1[key]) && isObject(file2[key])) {
        acc[key] = generateDifference(file1[key], file2[key]);
        return acc;
      }
      if (file1[key] !== file2[key]) {
        acc[key] = 'changed';
      } else {
        acc[key] = 'unchanged';
      }
      return acc;
    }, {});

  return keyStates;
};

export default generateDifference;
