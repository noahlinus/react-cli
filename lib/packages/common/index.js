const fs = require("fs-extra");
const path = require("path");
const execa = require("execa");

const writeJsonToApp = (root, fileName, content) => {
  fs.writeFileSync(path.join(root, fileName), JSON.stringify(content, null, 2));
};

const getPackageJson = (fileName) => {
  const packageJson = require(`../${fileName}/package.json`);
  return packageJson;
}

const installDeps = (deps, root, isDev = false) => {
  deps.forEach(dep => {
    execa.sync('npm', ['i', dep, isDev ? '--save-dev' : '--save'], {
      cwd: root,
      stdio: "inherit"
    });
  });
}

const installPackge = (root) => {
  execa.sync('npm', ['i'], {
    cwd: root,
    stdio: "inherit"
  })
}

const setNewPackageVersion = (deps) => {
  for (let key in deps) {
    deps[key] = '^' + execa.sync('npm', ['view', key, 'version']).stdout;
  }
}

const copyFiles = (dirPath, appRoot) => {
  fs.removeSync(dirPath + '/node_modules');
  fs.copySync(dirPath, appRoot, {
    filter: (file, dest) => path.basename(file) !== 'package.json'
  })
}

module.exports = {
  writeJsonToApp,
  getPackageJson,
  installDeps,
  copyFiles,
  setNewPackageVersion,
  installPackge,
}
