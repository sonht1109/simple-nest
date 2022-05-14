import * as fs from 'fs';

export const isFileExists = (path: string): Promise<boolean> =>
  new Promise((resolve) => {
    fs.existsSync(path);
    resolve(true);
  });

export const unlinkFile = (path: string) =>
  new Promise((resolve) => {
    fs.unlinkSync(path);
    resolve(true);
  });

export const removeFileIfExists = async (path: string) => {
  const exists = await isFileExists(path);
  if (exists) {
    await unlinkFile(path);
  }
};
