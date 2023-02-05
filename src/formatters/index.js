import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const format = (diffTree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`Wrong output format: ${outputFormat}. Choose 'stylish', 'plain' or 'json'.`);
  }
};

export default format;
