import path from "path";
import getConfig, { Config } from "./config";
import zip from './utils/zip';

export interface BuildReturn {
  /**
   * 生成的zip路径
   */
  buildZipPath: string; 
  /**
   * 配置数据
   */
  config: Config
}

/**
 * build 打包文件
 */
async function build(options: {
  project: string,
  version: string;
}): Promise<BuildReturn> {
  const { project, version } = options;
  const config = await getConfig();

  // console.log('build>>>', options, config);

  let zipPath = config.distPath;
  if(project){
    zipPath = path.join(config.distPath, project);
  } 

  const zipNameArr = ['build'];
  if(project){
    zipNameArr.push(project);
  }
  if(version){
    zipNameArr.push(`V${version}`);
  }
  const zipName = `${zipNameArr.join('-')}.zip`;

  const zipDistPath = project ? '../zip' : './zip';

  try{
    const buildZipPath = await zip(zipPath, zipName, zipDistPath, config);
    return {
      buildZipPath,
      config
    };
  } catch(e){
    throw new Error(e);
  }
}

export default build;
