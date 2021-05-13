import { Config } from "./config";
export interface BuildReturn {
    /**
     * 生成的zip路径
     */
    buildZipPath: string;
    /**
     * 配置数据
     */
    config: Config;
}
/**
 * build 打包文件
 */
declare function build(options: {
    project: string;
    version: string;
}): Promise<BuildReturn>;
export default build;
