import chalk from "chalk";

const logLevels = {
  debug: { icon: "🐛" },
  info: { icon: "✅" },
  warn: { icon: "⚠️" },
  error: { icon: "❌" },
};

export default {
  debug: (...args: any[]) => {
    console.log(chalk.magenta(logLevels.debug.icon), ...args);
  },
  info: (...args: any[]) => {
    console.info(chalk.green(logLevels.info.icon), ...args);
  },
  warn: (...args: any[]) => {
    console.warn(chalk.yellow(logLevels.warn.icon), ...args);
  },
  error: (...args: any[]) => {
    console.error(chalk.red(logLevels.error.icon), ...args);
  },
};
