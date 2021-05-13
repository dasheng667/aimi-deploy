/**
 *
 * @param src 需要打包的路径
 * @param releaseZipName 打包后的zip名称
 * @returns
 */
declare function zipBundle(src: string, releaseZipName: string, zipDistPath?: string): Promise<string>;
export default zipBundle;
