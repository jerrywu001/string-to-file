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

export async function jsonToBase64(json: Record<string, any>, forceEncode = false) {
  return new Promise((resolve) => {
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      console.log('json blob event: ', e);
      resolve(e?.target?.result || '');
    };
  });
}

export async function jsonToFile(json: Record<string, any>, filename: string) {
  const base64 = await jsonToBase64(json) as string;
  const file = base64ToFile(base64, filename);
  return file;
}

export function stringToBase64(str: string, opts = {} as { forceEncode: boolean; fileType: FileType }) {
  const { forceEncode = false, fileType = FileType.JSON } = opts;
  const bytes = forceEncode ? encodeURI(str) : str;
  return `data:${fileType};base64,${btoa(bytes)}`;
}

export function stringToFile(str: string, fileName: string, opts = {} as ConvertOptions) {
  const { encodeString = false, fileType = FileType.JSON } = opts;
  const bytes = encodeString ? encodeURI(str) : str;
  const blob = new Blob([bytes], { type: 'text/plain;charset=utf-8' });
  return new window.File([blob], fileName, { type: fileType });
}

export function getFormData(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
}

export async function blobToString(blob: Blob) {
  const str = await new Response(blob).text();
  return str;
}

export async function fileToString(file: File) {
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
      resolve(e.target?.result);
    };
  });
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
