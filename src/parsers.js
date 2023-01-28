import yaml from 'js-yaml';

const parse = (data, dataFormat) => {
  switch (dataFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('Wrong data format!');
  }
};

export default parse;
