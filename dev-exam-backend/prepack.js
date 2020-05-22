const fs = require('fs');
const packageJson = require('./package.json');

packageJson.bundledDependencies = [];

const dependencias = packageJson.dependencies;

Object.keys(dependencias).forEach((key) => {
  packageJson.bundledDependencies.push(key);
});

fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
  if (err) {
    throw new Error(`Erro ao gerar package: ${err}`);
  }
});
