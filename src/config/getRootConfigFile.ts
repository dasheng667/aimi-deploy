import { resolve } from "path";
import fs from 'fs';

export default function getConfigFilePath(): string {
  let fileList = [
    resolve("./", ".aimi-deploy.js"),
  ];
  let ret = '';

  fileList.some((filePath) => {
    const isExist = fs.existsSync(filePath);
    if (isExist) {
      ret = filePath;
    }
    return isExist;
  })

  return ret
}