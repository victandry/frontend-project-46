import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const format = (diffTree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return makeStylish(diffTree);
    case 'plain':
      return makePlain(diffTree);
    case 'json':
      return makeJson(diffTree);
    default:
      return makeStylish(diffTree);
  }
};

export default format;
