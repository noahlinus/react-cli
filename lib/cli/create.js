const inquirer = module.require('inquirer');
const chalk = require("chalk");
const fs = require("fs-extra");
const Creator = require('./Creator');

function create(appName) {
  const choices = [
    { name: `default (${chalk.yellow('Redux, Ant Design, Less, Router, ESLint')})`, value: 'default' },
    { name: 'Manually select features', value: 'manually' },
  ];

  const { getUserConfig } = require('../packages/common');
  const userConfig = getUserConfig();

  if (userConfig.hasConfig) {
    const { config } = userConfig;
    const choiceTemp = Object.values(config).join(', ');
    choices.unshift({ name: `config (${chalk.yellow(choiceTemp + ', Router, ESLint')})`, value: 'config' });
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Please pick a preset:',
        choices,
      },
    ])
    .then(answers => {
      switch (answers.preset) {
        case 'default':
          const creator = new Creator(appName, { stateManagement: 'Redux', cssPre: 'LESS', design: 'Ant Design' });
          creator.create();
          break;
        case 'manually':
          selectManually(appName);
          break;
        case 'config':
          const { config } = userConfig;
          const configCreator = new Creator(appName, config);
          configCreator.create();
          break;

      }
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
        message: 'Pick a state management:',
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
          'styled-components',
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
