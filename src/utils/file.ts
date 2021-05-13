import fs from 'fs';

export const existsSync = (filePath: string) => fs.existsSync(filePath);