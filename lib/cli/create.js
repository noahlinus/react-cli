const inquirer = module.require('inquirer');
const chalk = require("chalk");

const execa = require("execa");
const fs = require("fs-extra");
const path = require("path");

const { getPackageJson, writeJsonToApp, installDeps, copyFiles,setNewPackageVersion, installPackge } = require('../packages/common');

function create(appName) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Please pick a preset:',
        choices: [
          { name: `default (${chalk.yellow('JavaScript, Mobx, Antd, Less, Router, ESLint')})`, value: 'default' },
          { name: 'Manually select features', value: 'manually' },
        ]
      },
    ])
    .then(answers => {
      if (answers.preset === 'default') {
        doDefault(appName);
        return;
      }
      selectManually();
    });
}

async function doDefault(appName) {
  const appDir = path.resolve(process.cwd(), appName);
  if (fs.existsSync(appDir)) {
    const { override } = await inquirer.prompt([
      {
        type: "confirm",
        name: "override",
        message: chalk.red(`directory ${appName} exist,override it?`)
      }
    ]);
    if (override) {
      console.log(chalk.green("removing..."));
      fs.removeSync(appDir);
    } else {
      process.exit(1);
    }
  }

  console.log(`🚀  Invoking generators...`);

  fs.mkdirSync(appDir);

  const package = getPackageJson('common-default');


  setNewPackageVersion(package.dependencies);
  setNewPackageVersion(package.devDependencies);

  package.name = appName;

  copyFiles(path.join(__filename, '../../packages/common-default'), appDir);

  writeJsonToApp(appDir, 'package.json', package);

  installPackge(appDir);

  process.exit(1);
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
