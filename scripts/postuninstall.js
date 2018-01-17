const fs = require('fs')
const path = require('path')

function checkConfig(configName) {
  const pathToConfig = path.join(__dirname, '../', configName)
  const pathToUserConfig = path.join(process.cwd(), configName)
  if (fs.existsSync(pathToConfig)) {
    const buff = fs.readFileSync(pathToConfig)
    const userBuff = fs.readFileSync(pathToUserConfig)
  
    // If the User hasn't changed the config then nuke it
    if (buff.equals(userBuff) ) {
      fs.unlinkSync(pathToUserConfig)
    }
  }
}

checkConfig('tsconfig.json')
checkConfig('tslint.json')
