"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const dayjs = require("dayjs");
const chalk = require("chalk");
function getStartText(name, customText) {
    if (customText) {
        return customText;
    }
    return `${name} 中...`;
}
function getUseTimeInfo(startTime) {
    const diffTime = dayjs().diff(startTime, "second", true);
    const useTime = `用时 ${chalk.magenta(diffTime + " 秒")}`;
    return useTime;
}
function taskLogger(name) {
    const taskName = chalk.yellow(name || "Task");
    let spinner = ora();
    let startTime = dayjs();
    let localTaskLogger = null;
    function dispose() {
        // 清除内存应用
        spinner = null;
        startTime = null;
        localTaskLogger = null;
    }
    localTaskLogger = {
        start(text) {
            if (!spinner) {
                return localTaskLogger;
            }
            startTime = dayjs();
            spinner.start(getStartText(taskName, text));
            return localTaskLogger;
        },
        fail(err) {
            if (err) {
                console.log(`\n${err}`);
            }
            spinner.fail(`${taskName} 失败，${getUseTimeInfo(startTime)}`);
            dispose();
        },
        succeed(customText) {
            if (customText) {
                spinner.succeed(`${customText}，${getUseTimeInfo(startTime)}`);
            }
            else {
                spinner.succeed(`${taskName} 成功，${getUseTimeInfo(startTime)}`);
            }
            dispose();
        },
        end(err) {
            if (!spinner) {
                return localTaskLogger;
            }
            if (err) {
                localTaskLogger.fail(err);
            }
            else {
                localTaskLogger.succeed();
            }
            return localTaskLogger;
        },
    };
    return localTaskLogger;
}
exports.default = taskLogger;
