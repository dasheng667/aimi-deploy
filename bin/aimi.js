#!/usr/bin/env node

"use strict";

// to use V8's code cache to speed up instantiation time
require("v8-compile-cache");

require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],

  plugins: ['@babel/plugin-syntax-dynamic-import'],

  extensions: [".js", ".ts", ".tsx"],
});

const program = require('commander')

program
  .version('1.0.0')
  .usage('<command> [options]')
  .command('build', '前端打包')
  .command('deploy', '前端部署到服务器')
  .on('--help', function() {
    console.log('========这里是帮助信息=======');
    console.log('aimi build');
    console.log('aimi build -p mall -v 1.0.0');
    console.log('---');
    console.log('aimi deploy test');
    console.log('aimi deploy test -p mall -v 1.0.0');
  })
  .parse(process.argv)