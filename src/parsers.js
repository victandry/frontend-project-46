import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const data = fs.readFileSync(filepath);
  const fileFormat = path.extname(filepath);
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
