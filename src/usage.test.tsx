import { expect } from 'vitest';
import {
  base64ToFile,
  fileToBlob,
  fileToString,
  jsonToBase64,
  stringToBase64,
  stringToFile,
} from '.';

const json = { name: 'jack', age: 12 };
const string = 'Hello world';
const jsString = 'const a = \'Hello world\';';

describe('string to file', () => {
  test('can get converted file', () => {
    const file = stringToFile(JSON.stringify(json, null, 2), 'test.json');
    const txtFile = stringToFile(string, 'test.txt');
    const jsFile = stringToFile(jsString, 'test.js');

    expect(file instanceof File).toBeTruthy();
    expect(file.name).toBe('test.json');

    expect(txtFile.name).toBe('test.txt');
    expect(jsFile.name).toBe('test.js');
  });

  test('file to blob', () => {
    const file = stringToFile(JSON.stringify(json, null, 2), 'test.json');

    expect(fileToBlob(file) instanceof Blob).toBeTruthy();
  });

  test('fileToString', async () => {
    const file = stringToFile(string, 'test.txt');
    const stringVal = await fileToString(file);

    expect(stringVal).toEqual(string);
  });

  test('jsonToBase64', async () => {
    const val = await jsonToBase64(json);

    expect(val.startsWith('data:application/json;base64,')).toBeTruthy();
  });

  test('stringToBase64', async () => {
    const val = await stringToBase64(string);

    expect(val.includes('base64,')).toBeTruthy();
  });

  test('base64ToFile', async () => {
    const base64 = await stringToBase64(string);
    const file = base64ToFile(base64, 'test.txt');

    expect(file.name).toBe('test.txt');
  });
});
