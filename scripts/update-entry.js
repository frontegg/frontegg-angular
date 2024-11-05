const fs = require('fs');
const path = require('path');
const {version} = require(path.join(__dirname, '../projects/frontegg-app/package.json'))
fs.writeFileSync(path.join(__dirname, '../projects/frontegg-app/src/sdkVersion.ts'), `export default { version: '${version}' };\n`, {encoding: 'utf-8'})