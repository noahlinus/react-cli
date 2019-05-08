const inquirer = module.require('inquirer');
const chalk = require("chalk");

function create() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Please pick a preset:',
        choices: [
          { name: `default (${chalk.yellow('JavaScript, Redux, Antd, Less, Router, ESLint')})`, value: 'default' },
          { name: 'Manually select features', value: 'manually' },
        ]
      },
    ])
    .then(answers => {
      if (answers.preset === 'default') {
        console.log(answers);
        return;
      }
      selectManually();
    });
}

function selectManually() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'language',
        message: 'pick a language:',
        choices: [
          'JavaScript',
          'TypeScript',
        ]
      },
      {
        type: 'list',
        name: 'stateManagement',
        message: 'pick a state management:',
        choices: [
          'Mobx',
          'Redux',
          'Select None',
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
          'Select None',
        ]
      },
      {
        type: 'list',
        name: 'design',
        message: 'Pick a UI Design:',
        choices: [
          'TDsign',
          'Ant Design',
          'Select None',
        ]
      },
    ])
    .then(answers => {
      console.log(answers);
    })
}

module.exports = create;
