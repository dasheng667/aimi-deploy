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
   * 本机dist目录
   */
  distPath?: string;
  server?: Server;
  sshConfig?: {
    develop?: SSHConfig;
    test?: SSHConfig;
    production?: SSHConfig;
  };
}

const config: Config = {
  distPath: undefined, // zip打包目录
  server: undefined   // 服务器执行命令
}

export default function(): Config | Promise<Config>{
  if(configFilePath){
    return import(configFilePath).then((option) => {
      return Object.assign(config, option.default);
    }).catch(() => config);
  }
  return config;
};