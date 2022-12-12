// import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import generateDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectedDifference = [
  '{',
  '  - follow: false',
  '    host: hexlet.io',
  '  - proxy: 123.234.53.22',
  '  - timeout: 50',
  '  + timeout: 20',
  '  + verbose: true',
  '}',
];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('generateDifference1', () => {
  const actualDifference = generateDifference(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualDifference).toEqual(expectedDifference.join('\n'));
});

test('generateDifference2', () => {
  const actualDifference = generateDifference(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actualDifference).toEqual(expectedDifference.join('\n'));
});
