#!/usr/bin/env node

const program = require('commander');
const build = require('../lib/build').default;

program
  .storeOptionsAsProperties(false)
  .description("打包环境")
  .option('-p, --project [projectName]', '项目名称')
  .option('-v, --version <version>', '项目版本')
  .parse(process.argv);

const { project, version } = program.opts();
build({ project, version });
