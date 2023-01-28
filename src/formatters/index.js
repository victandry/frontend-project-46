import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const format = (differenceTree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return makeStylish(differenceTree);
    case 'plain':
      return makePlain(differenceTree);
    case 'json':
      return makeJson(differenceTree);
    default:
      return makeStylish(differenceTree);
  }
};

export default format;
