import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const genDiff = (filepath1, filepath2, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(filepath1, filepath2);
    case 'plain':
      return makePlain(filepath1, filepath2);
    case 'json':
      return makeJson(filepath1, filepath2);
    default:
      return 'no such format';
  }
};

export default genDiff;
