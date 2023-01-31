import yaml from 'js-yaml';

const parse = (data, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong input data format: ${dataFormat}. Use files with json, yml/yaml formats.`);
  }
};

export default parse;
