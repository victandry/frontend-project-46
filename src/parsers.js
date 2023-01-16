import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от расширения файла

const parse = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
