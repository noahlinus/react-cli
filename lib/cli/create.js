const inquirer = module.require('inquirer');
const chalk = require("chalk");
const fs = require("fs-extra");
const Creator = require('./Creator');

function create(appName) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Please pick a preset:',
        choices: [
          { name: `default (${chalk.yellow('Mobx, Antd, Less, Router, ESLint')})`, value: 'default' },
          { name: 'Manually select features', value: 'manually' },
        ]
      },
    ])
    .then(answers => {
      if (answers.preset === 'default') {
        const creator = new Creator(appName, { stateManagement: 'Mobx', cssPre: 'LESS', design: 'Ant Design' });
        creator.create();
        return;
      }
      selectManually(appName);
    });
}

function selectManually(appName) {
  inquirer
    .prompt([
      // {
      //   type: 'list',
      //   name: 'language',
      //   message: 'pick a language:',
      //   choices: [
      //     'JavaScript',
      //     'TypeScript',
      //   ]
      // },
      {
        type: 'list',
        name: 'stateManagement',
        message: 'pick a state management:',
        choices: [
          'Mobx',
          'Redux',
        ]
      },
      {
        type: 'list',
        name: 'cssPre',
        message: 'Pick a CSS pre-processor:',
        choices: [
          'LESS',
          'SCSS/SASS',
          'Styled-Components',
        ]
      },
      {
        type: 'list',
        name: 'design',
        message: 'Pick a UI Design:',
        choices: [
          'Ant Design',
          'Ant Design Mobile',
        ]
      },
    ])
    .then(answers => {
      const creator = new Creator(appName, answers);
      creator.create();
    })
}


module.exports = create;
