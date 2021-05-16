# aimi-deploy 前端部署工具
1. 将文件打包成zip
2. 将zip文件上传到服务器，并执行命令

# 安装

```bash
yarn add aimi-deploy
```

# 用法
## 打包
``` bash
aimi-deploy build
aimi-deploy build -p mall -v 1.0.0
```

## 打包并部署
`aimi-deploy upload [env]` env有4个选项 `develop` `test` `gray` `production`

`env`的配置跟`sshConfig`配置对应。

``` bash
// 打包测试环境
aimi-deploy upload test
aimi-deploy upload test -p mall -v 1.0.0
// 打包生产环境
aimi-deploy upload production
```

## Config
新建 `.aimi-deploy.js` 文件进行配置。

示例：
```js
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  distPath: resolve('./dist'),
  server: {
    remotePath: '',
    shellExecList: []
  },
  sshConfig: {
    production: {
      host: '',
      port: 8888,
      username: ''
    }
  }
};
```

## 具体配置

### distPath
> 需要打包的目录

### server.remotePath
+ Type: `string`

> 发送到远程服务器的目录

### zipExcludeFile
+ Type: `string[]`
> zip打包时需要过滤的文件，默认过滤 node_modules dist

用法
```js
zipExcludeFile: ["!./file"]
```

### server.shellExecList
+ Type: `string[]`

> 在服务器端执行命令

示例：解压上传的文件
```js
shellExecList = [
  `unzip -o /app/upload/build.zip -d /app/website`,
  `cd /app/website`,
  'npm run reset',
  'exit',
];
```


### sshConfig[env]
> 链接服务器的ssh配置

详情就是ssh的配置，示例：
```js
{
  host: '',
  port: 8888,
  username: ''，
  privateKey: ''
}
```