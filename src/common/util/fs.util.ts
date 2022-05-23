import * as fs from 'fs';
import { join } from 'path';

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

export const removeWholeFolder = (path: string) =>
  fs.rmSync(path, { recursive: true, force: true });

export const removeAllFilesInFolder = (path: string) => {
  fs.readdir(path, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(join(path, file), (err) => {
        if (err) throw err;
      });
    }
  });
};
