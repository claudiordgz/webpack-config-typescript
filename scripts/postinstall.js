const path = require('path')
const fs = require('fs')

console.log(JSON.stringify(process, null, 2))

function copyConfig(configName) {
  const pathToConfig = path.join(__dirname, '../', configName)

  const pathToNewConfigDir = path.dirname(process.argv[1])
  const pathToNewConfig = path.join(pathToNewConfigDir, configName)

  console.info(`Copying ${pathToConfig} to => ${pathToNewConfig}`)
  fs.createReadStream(pathToConfig).pipe(fs.createWriteStream(pathToNewConfig))
}

copyConfig('tsconfig.json')
copyConfig('tslint.json')