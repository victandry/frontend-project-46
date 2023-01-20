import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import makeStylish from '../formatters/stylish.js';
import makePlain from '../formatters/plain.js';
import makeJson from '../formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectedStylishDifference = [
  '{',
  '    common: {',
  '      + follow: false',
  '        setting1: Value 1',
  '      - setting2: 200',
  '      - setting3: true',
  '      + setting3: null',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '        setting6: {',
  '            doge: {',
  '              - wow: ',
  '              + wow: so much',
  '            }',
  '            key: value',
  '          + ops: vops',
  '        }',
  '    }',
  '    group1: {',
  '      - baz: bas',
  '      + baz: bars',
  '        foo: bar',
  '      - nest: {',
  '            key: value',
  '        }',
  '      + nest: str',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '        deep: {',
  '            id: 45',
  '        }',
  '    }',
  '  + group3: {',
  '        deep: {',
  '            id: {',
  '                number: 45',
  '            }',
  '        }',
  '        fee: 100500',
  '    }',
  '}',
];

const expectedPlainDifference = [
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting2' was removed",
  "Property 'common.setting3' was updated. From true to null",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group1.nest' was updated. From [complex value] to 'str'",
  "Property 'group2' was removed",
  "Property 'group3' was added with value: [complex value]",
];

const expectedJsonDifference = [
  '{',
  '"common":',
  '{',
  '"follow":"added",',
  '"setting1":"unchanged",',
  '"setting2":"removed",',
  '"setting3":"changed",',
  '"setting4":"added",',
  '"setting5":"added",',
  '"setting6":',
  '{',
  '"doge":',
  '{',
  '"wow":"changed"',
  '},',
  '"key":"unchanged",',
  '"ops":"added"',
  '}',
  '},',
  '"group1":',
  '{',
  '"baz":"changed",',
  '"foo":"unchanged",',
  '"nest":"changed"',
  '},',
  '"group2":"removed",',
  '"group3":"added"',
  '}',
];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('generateStylishDifference', () => {
  const actualDifference = makeStylish(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualDifference).toEqual(expectedStylishDifference.join('\n'));
});

test('generatePlainDifference', () => {
  const actualDifference = makePlain(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualDifference).toEqual(expectedPlainDifference.join('\n'));
});

test('generateJsonDifference', () => {
  const actualDifference = makeJson(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualDifference).toEqual(expectedJsonDifference.join(''));
});
