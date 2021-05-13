import fs from "fs";
import vfs from "vinyl-fs";
import path from "path";
import zip from "gulp-zip";
import taskLogger from "./logger";

/**
 * 
 * @param src 需要打包的路径
 * @param releaseZipName 打包后的zip名称
 * @returns 
 */
async function zipBundle(src: string, releaseZipName: string, zipDistPath: string = './zip'): Promise<string> {

  if(!fs.existsSync(src)){
    throw new Error(`${src} 目录不存在`);
  }

  const logger = taskLogger("Zip 压缩");

  logger.start();

  return await new Promise((res, rej) => {
    const mode = parseInt("40755", 8);
    vfs
      .src(`${src}/**/*`)
      .pipe(zip(releaseZipName))
      .pipe(
        vfs.dest(path.resolve(src, zipDistPath), {
          dirMode: mode,
        })
      )
      .on("end", (err) => {
        if (err) {
          logger.end(err);
          return rej(err);
        }

        res(path.join(src, zipDistPath, releaseZipName));
        logger.end();
      });
  });
}

export default zipBundle;
