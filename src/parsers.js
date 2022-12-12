import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от расширения файла

const parse = (data, extension) => {
  let parserFunction;
  if (extension === '' || extension === '.json') {
    parserFunction = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parserFunction = yaml.load;
  }
  return parserFunction(data);
};

export default parse;
