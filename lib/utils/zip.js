"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const path_1 = __importDefault(require("path"));
const gulp_zip_1 = __importDefault(require("gulp-zip"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = require("../config");
/**
 *
 * @param src 需要打包的路径
 * @param releaseZipName 打包后的zip名称
 * @returns
 */
async function zipBundle(src, releaseZipName, zipDistPath = "./zip", config) {
    if (!fs_1.default.existsSync(src)) {
        throw new Error(`${src} 目录不存在`);
    }
    const logger = logger_1.default("Zip 压缩");
    logger.start();
    let zipExcludeFile = config_1.excludeFile;
    if (config && Array.isArray(config.zipExcludeFile)) {
        zipExcludeFile = zipExcludeFile.concat(config.zipExcludeFile);
    }
    const fsSrc = [path_1.default.join(src, '/**/*')];
    zipExcludeFile.forEach(excSrc => {
        fsSrc.push(`!${path_1.default.join(src, excSrc.substr(1))}`);
        fsSrc.push(`!${path_1.default.join(src, excSrc.substr(1)) + '/**/*'}`);
    });
    return await new Promise((res, rej) => {
        const mode = parseInt("40755", 8);
        vinyl_fs_1.default
            .src(fsSrc)
            .pipe(gulp_zip_1.default(releaseZipName))
            .pipe(vinyl_fs_1.default.dest(path_1.default.resolve(src, zipDistPath), {
            dirMode: mode,
        }))
            .on("end", (err) => {
            if (err) {
                logger.end(err);
                return rej(err);
            }
            res(path_1.default.join(src, zipDistPath, releaseZipName));
            logger.end();
        });
    });
}
exports.default = zipBundle;
