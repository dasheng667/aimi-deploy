const ora = require("ora");
const dayjs = require("dayjs");
const chalk = require("chalk");

interface TaskLogger {
  start(text?: string): TaskLogger;
  fail(err?: string): void;
  succeed(text?: string): void;
  end(err?: string): void;
}

function getStartText(name: string, customText: string) {
  if (customText) {
    return customText;
  }

  return `${name} 中...`;
}

function getUseTimeInfo(startTime: number) {
  const diffTime = dayjs().diff(startTime, "second", true);
  const useTime = `用时 ${chalk.magenta(diffTime + " 秒")}`;

  return useTime;
}

function taskLogger(name: string) {
  const taskName = chalk.yellow(name || "Task");
  let spinner = ora();
  let startTime = dayjs();
  let localTaskLogger: TaskLogger | null = null;

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

    fail(err: string) {
      if (err) {
        console.log(`\n${err}`);
      }

      spinner.fail(`${taskName} 失败，${getUseTimeInfo(startTime)}`);

      dispose();
    },

    succeed(customText) {
      if (customText) {
        spinner.succeed(`${customText}，${getUseTimeInfo(startTime)}`);
      } else {
        spinner.succeed(`${taskName} 成功，${getUseTimeInfo(startTime)}`);
      }

      dispose();
    },

    end(err: string) {
      if (!spinner) {
        return localTaskLogger;
      }

      if (err) {
        localTaskLogger.fail(err);
      } else {
        localTaskLogger.succeed();
      }

      return localTaskLogger;
    },
  };

  return localTaskLogger;
}

export default taskLogger;
