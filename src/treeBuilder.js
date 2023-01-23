import _ from 'lodash';

const isObject = (value) => (value === Object(value) && !Array.isArray(value));

const generateDifference = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(data1Keys, data2Keys));

  const keyStates = sortedKeys
    .reduce((acc, key) => {
      if (!_.has(data1, key)) {
        return [...acc, {
          key: [key],
          type: 'added',
          value: data2[key],
        },
        ];
      }
      if (!_.has(data2, key)) {
        return [...acc, {
          key: [key],
          type: 'removed',
          value: data1[key],
        },
        ];
      }
      if (isObject(data1[key]) && isObject(data2[key])) {
        return [...acc, {
          key: [key],
          type: 'nested',
          value: generateDifference(data1[key], data2[key]),
        },
        ];
      }
      if (data1[key] !== data2[key]) {
        return [...acc, {
          key: [key],
          type: 'changed',
          value: [data1[key], data2[key]],
        },
        ];
      }
      return [...acc, {
        key: [key],
        type: 'unchanged',
        value: data1[key],
      },
      ];
    }, []);
  return keyStates;
};

export default generateDifference;
