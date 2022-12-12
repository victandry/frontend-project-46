// import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { path, dirname } from 'path';
import generateDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('generateDifference1', () => {
  const expectedDifference1 = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ];
  expect(generateDifference(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedDifference1.join('\n'));
});

test('generateDifference2', () => {
  const expectedDifference2 = [
    '{',
    '  - age: 27',
    '  + age: 29',
    '  - married: false',
    '  + married: true',
    '    name: Maria',
    '  + place of birth: Kazan',
    '  - surname: Ivanova',
    '  + surname: Kuznetsova',
    '  - university: SPbGU',
    '  + university: SPbPU',
    '}',
  ];
  expect(generateDifference(getFixturePath('file3.json'), getFixturePath('file4.json'))).toEqual(expectedDifference2.join('\n'));
});
