import getRootConfigFile from "./getRootConfigFile";

const configFilePath = getRootConfigFile();

if (configFilePath) {
  import(configFilePath);
}

export interface Server {
 /**
   * 服务端远程路径
   */
  remotePath?: string;
  /**
   * 服务器需要执行的命令
   */
  shellExecList?: string[];
}

export interface SSHConfig {
  host: string,
  port: string,
  username: string,
  privateKey: string,
}

export interface Config {
  /**
   * 需要打包的目录
   */
  distPath?: string;
  /**
   * 服务端配置
   */
  server?: Server;
  zipExcludeFile?: string[];
  sshConfig?: {
    develop?: SSHConfig;
    test?: SSHConfig;
    production?: SSHConfig;
  };
}

const config: Config = {
  distPath: undefined,
  server: undefined 
}

export const excludeFile = [
  "!./node_modules",
  "!./dist",
];

export default function(): Config | Promise<Config>{
  if(configFilePath){
    return import(configFilePath).then((option) => {
      return Object.assign(config, option.default);
    }).catch(() => config);
  }
  return config;
};