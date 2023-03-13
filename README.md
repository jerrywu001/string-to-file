# string-to-file

Transform string to file in client side.

Playground: https://string-to-file.js-bridge.com

## Installation

```bash
$ yarn add string-to-file
```

```bash
$ npm install -S string-to-file
```

## playground

```bash
git clone https://github.com/jerrywu001/string-to-file

npm i

npm run dev
```

## Usage

- json to file

```ts
import { stringToFile, saveFile } from 'string-to-file';

const json = {
  name: "jack",
  age: 12
};

const jsonFile = stringToFile(JSON.stringify(json, null, 2), 'xxx.json');

// download
saveFile(jsonFile);
```

- string to file

```ts
import { stringToFile, saveFile } from 'string-to-file';

const string = `Hello world!

How are you!`;

const stringFile = stringToFile(string, 'xxx.txt');

// download
saveFile(stringFile);
```

- script to file

```ts
import { stringToFile, saveFile } from 'string-to-file';

const jsString = `const a = 'Hello world!';

console.log(a);`;

const jsFile = stringToFile(jsString, 'xxx.js');

// download
saveFile(jsFile);
```

## Utils

- `fileToBlob(file: File): Blob`

- `saveFile(file: File, customFileName?: string): Promise<void>`

- `blobToString(blob: Blob): Promise<string>`

- `fileToString(file: File): Promise<string>`

- `jsonToBase64(json: Record<string, any>): Promise<string>`

- `stringToBase64(str: string, opts?: { forceEncode: boolean; fileType: FileType; }): string`

- `base64ToFile(base64Url: string, filename: string): File`