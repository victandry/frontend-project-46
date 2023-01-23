// import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от файла

/* const parse = (data, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
}; */

const parse = (data) => (JSON.parse(data));

export default parse;
