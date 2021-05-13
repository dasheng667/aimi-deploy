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
export default function (): Config | Promise<Config>;
