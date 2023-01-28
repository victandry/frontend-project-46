import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (fixtureName) => fs.readFileSync(getFixturePath(fixtureName)).toString();

describe('Generate difference (gendiff)', () => {
  const stylishResult = readFixture('stylishDifference.txt');
  const plainResult = readFixture('plainDifference.txt');
  const jsonResult = readFixture('jsonDifference.txt');

  it('should compare json files', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(stylishResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(plainResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(jsonResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(stylishResult);
  });
  it('should compare yml files', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(stylishResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(plainResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(jsonResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(stylishResult);
  });
});
