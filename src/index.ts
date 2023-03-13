export function stringToFile(str: string, fileName: string, opts = {} as ConvertOptions) {
  const { encodeString = false, fileType = FileType.JSON } = opts;
  const bytes = encodeString ? encodeURI(str) : str;
  const blob = new Blob([bytes], { type: 'text/plain;charset=utf-8' });
  return new window.File([blob], fileName, { type: fileType });
}

/**
 * download file
 * @param file File
 * @param customFileName file name string
 * @param type `text/plain` ...
 */
export async function saveFile(file: File, customFileName?: string): Promise<void> {
  return new Promise(() => {
    const reader = new FileReader();
    const blob = fileToBlob(file);
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      const a = document.createElement('a');
      a.download = file.name || customFileName as string;
      a.href = e?.target?.result as string;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    reader.onerror = function (e) {
      console.warn(e);
      throw new Error('download fail');
    };
  });
}

/**
 * file to blob
 * @param file File
 * @param type `text/plain` ...
 * @returns Blob
 */
export function fileToBlob(file: File) {
  return new Blob([file], { type: 'text/plain', endings: 'native' });
}

export async function blobToString(blob: Blob) {
  const str = await new Response(blob).text();
  return str;
}

export async function fileToString(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file assign!');
  }

  if (typeof file.text === 'function') {
    const string = await file.text();
    return string;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
  });
}

export function base64ToFile(base64Url: string, filename: string) {
  const arr = base64Url.split(',');

  // @ts-ignore
  const type = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type });
}

export async function jsonToBase64(json: Record<string, any>): Promise<string> {
  return new Promise((resolve) => {
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      resolve(e?.target?.result as string || '');
    };
    reader.onerror = (e) => {
      console.warn(e);
      resolve('');
    };
  });
}

export function stringToBase64(str: string, opts = {} as { forceEncode: boolean; fileType: FileType }) {
  const { forceEncode = false, fileType = FileType.JSON } = opts;
  const bytes = forceEncode ? encodeURI(str) : str;
  return `data:${fileType};base64,${btoa(bytes)}`;
}

export interface ConvertOptions {
  encodeString?: boolean;
  /**
   * @default 'application/json'
   */
  fileType?: FileType;
}

export enum FileType {
  Text = 'text/plain',
  JSON = 'application/json',
  JavaScript = 'application/javascript',
}
