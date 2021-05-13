"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFile = void 0;
const getRootConfigFile_1 = __importDefault(require("./getRootConfigFile"));
const configFilePath = getRootConfigFile_1.default();
if (configFilePath) {
    Promise.resolve().then(() => __importStar(require(configFilePath)));
}
const config = {
    distPath: undefined,
    server: undefined
};
exports.excludeFile = [
    "!./node_modules",
    "!./dist",
];
function default_1() {
    if (configFilePath) {
        return Promise.resolve().then(() => __importStar(require(configFilePath))).then((option) => {
            return Object.assign(config, option.default);
        }).catch(() => config);
    }
    return config;
}
exports.default = default_1;
;
