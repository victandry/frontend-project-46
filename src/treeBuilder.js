import _ from 'lodash';

const isObject = (value) => (value === Object(value) && !Array.isArray(value));

const generateDifference = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const sortedKeys = _.sortBy(_.union(file1Keys, file2Keys));

  const keyStates = sortedKeys
    .reduce((acc, key) => {
      if (!_.has(file1, key)) {
        return { ...acc, [key]: 'added' };
      }
      if (!_.has(file2, key)) {
        return { ...acc, [key]: 'removed' };
      }
      if (isObject(file1[key]) && isObject(file2[key])) {
        return { ...acc, [key]: generateDifference(file1[key], file2[key]) };
      }
      if (file1[key] !== file2[key]) {
        return { ...acc, [key]: 'changed' };
      }
      return { ...acc, [key]: 'unchanged' };
    }, {});
  return keyStates;
};

export default generateDifference;
