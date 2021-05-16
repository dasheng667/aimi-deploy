#!/usr/bin/env node

const program = require('commander');
const build = require('../lib/build').default;
const server = require('../lib/server').default;

program
  .command('upload [env]')
  .description("部署环境")
  .option('-p, --project [projectName]', '项目名称')
  .option('-v, --version <version>', '项目版本')
  .action(async (env, options) => {
    // console.log('action.env:', arguments);
    if (['test', 'develop', 'gray', 'production'].includes(env)) {
      const { project, version } = options;
      const buildData = await build({ project, version });

      server(buildData, env);
    } else {
      console.log("请输入正确部署的环境 aimi-deploy upload [env]：'test', 'develop', 'gray', 'production'")
    }
  })
  .parse(process.argv)
