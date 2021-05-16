"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
function getConfigFilePath() {
    let fileList = [
        path_1.resolve("./", ".aimi-deploy.js"),
    ];
    let ret = '';
    fileList.some((filePath) => {
        const isExist = fs_1.default.existsSync(filePath);
        if (isExist) {
            ret = filePath;
        }
        return isExist;
    });
    return ret;
}
exports.default = getConfigFilePath;
