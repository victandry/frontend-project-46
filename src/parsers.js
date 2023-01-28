import yaml from 'js-yaml';

const parse = (data, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
