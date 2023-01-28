import yaml from 'js-yaml';

const parse = (data, dataFormat) => {
  if (dataFormat === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
