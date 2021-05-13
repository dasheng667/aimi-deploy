import { BuildReturn } from './build';
declare type ENV = 'develop' | 'test' | 'production';
declare function server(options: BuildReturn, env: ENV): Promise<void>;
export default server;
