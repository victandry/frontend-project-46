// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../src/formatters/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Generate difference (gendiff)', () => {
  it('should compare json files', () => {
    const actualStylishDifference = genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'stylish');
    const expectedStylishDifference = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
    expect(actualStylishDifference).toEqual(expectedStylishDifference);

    const actualPlainDifference = genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'plain');
    const expectedPlainDifference = fs.readFileSync('__fixtures__/plainDifference.txt').toString();
    expect(actualPlainDifference).toEqual(expectedPlainDifference);

    const actualJsonDifference = genDiff('__fixtures__/file1.json', '__fixtures__/file2', 'json');
    const expectedJsonDifference = fs.readFileSync('__fixtures__/jsonDifference.txt').toString();
    expect(actualJsonDifference).toEqual(expectedJsonDifference);

    const actualUndefinedDifference = genDiff('__fixtures__/file1.json', '__fixtures__/file2', '');
    const expectedUndefinedDifference = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
    expect(actualUndefinedDifference).toEqual(expectedUndefinedDifference);
  });
  it('should compare yml files', () => {
    const actualStylishDifference = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish');
    const expectedStylishDifference = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
    expect(actualStylishDifference).toEqual(expectedStylishDifference);

    const actualPlainDifference = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain');
    const expectedPlainDifference = fs.readFileSync('__fixtures__/plainDifference.txt').toString();
    expect(actualPlainDifference).toEqual(expectedPlainDifference);

    const actualJsonDifference = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json');
    const expectedJsonDifference = fs.readFileSync('__fixtures__/jsonDifference.txt').toString();
    expect(actualJsonDifference).toEqual(expectedJsonDifference);

    const actualUndefinedDifference = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', '');
    const expectedUndefinedDifference = fs.readFileSync('__fixtures__/stylishDifference.txt').toString();
    expect(actualUndefinedDifference).toEqual(expectedUndefinedDifference);
  });
});
