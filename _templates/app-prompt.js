const { readdirSync, statSync } = require('fs')
const { join } = require('path')

// const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

function getDirectories(path) {
  return readdirSync(path).filter(function (file) {
    return statSync(path+'/'+file).isDirectory() && !(/^[\._]/g).test(file);
  });
}

module.exports = [
  {
    type: 'list',
    name: 'app',
    choices: getDirectories('./'),
    message: 'Select app'
  }
];