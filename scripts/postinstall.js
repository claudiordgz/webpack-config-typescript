const path = require('path')
const fs = require('fs')

const pathToTSConfig = path.join(__dirname, '../', 'tsconfig.json')
const pathToTSLintConfig = path.join(__dirname, '../', 'tslint.json')

const pathToNewTSConfig = path.join(process.cwd(), 'tsconfig.json')
const pathToNewTSLintConfig = path.join(process.cwd(), 'tslint.json')

console.info(`Copying ${pathToTSConfig} to => ${pathToNewTSConfig}`)
fs.createReadStream(pathToTSConfig).pipe(fs.createWriteStream(pathToNewTSConfig))

console.info(`Copying ${pathToTSLintConfig} to => ${pathToNewTSLintConfig}`)
fs.createReadStream(pathToTSLintConfig).pipe(fs.createWriteStream(pathToNewTSLintConfig))