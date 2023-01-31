import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(data1Keys, data2Keys));

  return sortedKeys
    .map((key) => {
      if (!_.has(data1, key)) {
        return {
          key,
          type: 'added',
          value: data2[key],
        };
      }
      if (!_.has(data2, key)) {
        return {
          key,
          type: 'removed',
          value: data1[key],
        };
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          key,
          type: 'nested',
          children: buildDiff(data1[key], data2[key]),
        };
      }
      if (data1[key] !== data2[key]) {
        return {
          key,
          type: 'changed',
          value: [data1[key], data2[key]],
        };
      }
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    });
};

export default buildDiff;
