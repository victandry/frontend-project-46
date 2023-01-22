import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const generateReport = (file1, file2, differenceTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(file1, file2, differenceTree);
    case 'plain':
      return makePlain(file1, file2, differenceTree);
    case 'json':
      return makeJson(differenceTree);
    default:
      return makeStylish(file1, file2, differenceTree);
  }
};

export default generateReport;
