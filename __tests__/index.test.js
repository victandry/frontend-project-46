import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import makeStylish from '../src/formatters/stylish.js';
import makePlain from '../src/formatters/plain.js';
import makeJson from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('generateStylishDifference', () => {
  const actualDifference = makeStylish(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedStylishDifference = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
  expect(actualDifference).toEqual(expectedStylishDifference);
});

test('generatePlainDifference', () => {
  const actualDifference = makePlain(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedPlainDifference = fs.readFileSync('__fixtures__/plainDifference.txt').toString();
  expect(actualDifference).toEqual(expectedPlainDifference);
});

test('generateJsonDifference', () => {
  const actualDifference = makeJson(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedJsonDifference = fs.readFileSync('__fixtures__/jsonDifference.txt').toString();
  expect(actualDifference).toEqual(expectedJsonDifference);
});
