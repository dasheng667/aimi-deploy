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
    host: string;
    port: string;
    username: string;
    privateKey: string;
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
export declare const excludeFile: string[];
export default function (): Config | Promise<Config>;
