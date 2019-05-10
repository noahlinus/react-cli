#!/usr/bin/env node
const program = require('commander');
const chalk = require("chalk");

program
  .version(require('../package').version)
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('create a new project powered by react-cli')
  .action(name => {
    const create = require('./cli/create');
    const { clearConsole } = require('./utils');
    clearConsole(chalk.blue(`React CLI v${require('../package').version}`));
    create(name);
  });

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

program.parse(process.argv);

if (!program.args.length) {
  program.outputHelp();
}