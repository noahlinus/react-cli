const chalk = require("chalk");

const help = () => {
  console.log(`
  Usage: react-cli ${chalk.yellow('create')} <app-name> [options]

  Options:
  -V, --version                              output the version number
  -h, --help                                 output usage information
  `);
}

module.exports = help;
