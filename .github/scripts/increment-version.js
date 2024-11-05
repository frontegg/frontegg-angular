const { writeFileSync } = require('fs');
const path = require('path');

function getCurrentVersion() {
  const pkg = require('../../projects/frontegg-app/package.json');
  const [major = 0, minor = 0, patch = 0] = pkg.version.split('.').map(Number);
  return { major, minor, patch };
}

function modifyVersion(newVersion) {
  const packageJsonPath = path.join(__dirname, `../projects/frontegg-app/package.json`);
  console.log('Modifying package.json', packageJsonPath);
  const pkg = require(packageJsonPath);
  pkg.version = `${newVersion.major}.${newVersion.minor}.${newVersion.patch}`;
  writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
}


export default (minorNeeded) => {
  const version = getCurrentVersion();
  let newVersion = { ...version };

  console.log(`Current version: ${version.major}.${version.minor}.${version.patch}`);
  const prLabels = getPrLabels();

  const minorNeeded = prLabels.some((label) => label.name?.toLowerCase?.() === 'minor');

  if (minorNeeded) {
    console.log('Minor version needed', { minorNeeded });
  }

  if (minorNeeded) {
    // minor version
    newVersion.minor = version.minor + 1;
    newVersion.patch = 0;
  } else {
    newVersion.patch = version.patch + 1;
  }
  modifyVersion(newVersion);
  console.log('new version', newVersion);
}


;
