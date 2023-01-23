import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от формата файла

const parse = (data, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
