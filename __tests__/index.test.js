// import { test, expect } from '@jest/globals';
import { beforeAll } from '@jest/globals';
import * as fs from 'fs';
import generateDifference from '../src/index.js';

let filepath1, filepath2, filepath3, filepath4;

beforeAll(() => {
  filepath1 = '${__dirname}/../__fixtures__/file1.json';
  filepath2 = '${__dirname}/../__fixtures__/file2.json';
  filepath3 = '${__dirname}/../__fixtures__/file3.json';
  filepath4 = '${__dirname}/../__fixtures__/file4.json';
})

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
  expect(generateDifference(filepath1, filepath2)).toEqual(expectedDifference1.join('\n'));
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
  expect(generateDifference(filepath3, filepath4)).toEqual(expectedDifference2.join('\n'));
});
