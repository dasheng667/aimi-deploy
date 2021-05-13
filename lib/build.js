"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const zip_1 = __importDefault(require("./utils/zip"));
/**
 * build 打包文件
 */
async function build(options) {
    const { project, version } = options;
    const config = await config_1.default();
    // console.log('build>>>', options, config);
    let zipPath = config.distPath;
    if (project) {
        zipPath = path_1.default.join(config.distPath, project);
    }
    const zipNameArr = ['build'];
    if (project) {
        zipNameArr.push(project);
    }
    if (version) {
        zipNameArr.push(`V${version}`);
    }
    const zipName = `${zipNameArr.join('-')}.zip`;
    const zipDistPath = project ? '../zip' : './zip';
    try {
        const buildZipPath = await zip_1.default(zipPath, zipName, zipDistPath);
        return {
            buildZipPath,
            config
        };
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.default = build;
