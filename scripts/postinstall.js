const path = require('path')
const fs = require('fs')

function copyConfig(configName) {
  const pathToConfig = path.join(__dirname, '../', configName)

  const pathToNewConfigDir = path.dirname(process.cwd())
  const pathToNewConfig = path.join(pathToNewConfigDir, '../', configName)

  console.info(`Copying ${pathToConfig} to => ${pathToNewConfig}`)
  fs.createReadStream(pathToConfig).pipe(fs.createWriteStream(pathToNewConfig))
}

copyConfig('tsconfig.json')
copyConfig('tslint.json')