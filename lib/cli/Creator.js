const chalk = require("chalk");

const fs = require("fs-extra");

const path = require("path");

const inquirer = module.require('inquirer');

const {
  getPackageJson,
  writeJsonToApp,
  copyFiles,
  setNewPackageVersion,
  installPackge,
  setUserConfig,
} = require('../packages/common');

class Creator {
  constructor(appName, answers) {
    this.appName = appName;
    this.answers = answers;
    this.appDir = path.resolve(process.cwd(), this.appName);
    this.package = getPackageJson('cli-switch');
    this.babelrc = {
      plugins: [
        [
          "import",
          {
            libraryName: "antd",
            style: true,
          }
        ]
      ]
    }
  }

  async testExistDir() {
    if (fs.existsSync(this.appDir)) {
      const { override } = await inquirer.prompt([
        {
          type: "confirm",
          name: "override",
          message: chalk.red(`directory ${this.appName} exist,override it?`)
        }
      ]);
      if (override) {
        console.log(chalk.green("removing..."));
        fs.removeSync(this.appDir);
        return true;
      } else {
        process.exit(1);
        return false;
      }
    }
    return true;
  }

  async create() {
    const { stateManagement, cssPre, design } = this.answers;

    console.log();

    console.log(`you pick: ${chalk.yellow(`${stateManagement}, ${cssPre}, ${design}, Router, ESLint`)}`);

    console.log();

    const isOk = await this.testExistDir(this.appDir, this.appName);

    if (!isOk) {
      return;
    }

    console.log(`🚀  Invoking generators...`);

    console.log();

    let { dependencies, devDependencies } = this.package;

    switch (stateManagement) {
      case 'Mobx':
        dependencies['mobx'] = '';
        dependencies['mobx-react'] = '';
        break;
      case 'Redux':
        devDependencies['redux-devtools'] = '';
        dependencies['redux'] = '';
        dependencies['react-redux'] = '';
        break;
    }

    switch (design) {
      case 'Ant Design':
        let myTd = this.babelrc.plugins[0][1];
        myTd.libraryDirectory = 'es';
        dependencies['antd'] = '';
        break;
      case 'Ant Design Mobile':
        let myTdw = this.babelrc.plugins[0][1];
        myTdw.libraryName = 'antd-mobile';
        myTdw.style = 'css';
        dependencies['antd-mobile'] = '';
        break;
    }

    switch (cssPre) {
      case 'LESS':
        dependencies['less-loader'] = '';
        devDependencies['react-app-rewire-less-modules'] = '';
        break;
      case 'SCSS/SASS':
        dependencies['node-sass'] = '';
        break;
      case 'styled-components':
        dependencies['styled-components'] = '';
        devDependencies['babel-plugin-styled-components'] = '';
        this.babelrc.plugins.push("babel-plugin-styled-components");
        break;
    }

    fs.mkdirSync(this.appDir);

    this.beginCopy(cssPre === 'LESS');

    writeJsonToApp(this.appDir, '.babelrc', this.babelrc);

    console.log(`📦  Installing additional dependencies...`);

    installPackge(this.appDir);

    setUserConfig({ hasConfig: true, config: this.answers });

    console.log(`🎉  Successfully created project ${chalk.yellow(this.appName)}.`)

    process.exit(1);
  }

  async beginCopy(isLess = false) {
    setNewPackageVersion(this.package.dependencies);
    setNewPackageVersion(this.package.devDependencies);

    this.package.name = this.appName;

    copyFiles(path.join(__filename, '../../packages/common-default'), this.appDir);

    writeJsonToApp(this.appDir, 'package.json', this.package);

    if (!isLess) {
      fs.copySync(path.join(__filename, '../../packages/cli-switch/config-overrides.js'), this.appDir + '/config-overrides.js');
    }

  }
}

module.exports = Creator;
