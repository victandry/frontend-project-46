import * as fs from 'fs';
import genDiff from '../src/index.js';

describe('Generate difference (gendiff)', () => {
  const stylishResult = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
  const plainResult = fs.readFileSync('__fixtures__/plainDifference.txt').toString();
  const jsonResult = fs.readFileSync('__fixtures__/jsonDifference.txt').toString();

  it('should compare json files', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'stylish')).toEqual(stylishResult);
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'plain')).toEqual(plainResult);
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'json')).toEqual(jsonResult);
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2', '')).toEqual(stylishResult);
  });
  it('should compare yml files', () => {
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(stylishResult);
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(plainResult);
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(jsonResult);
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', '')).toEqual(stylishResult);
  });
});
