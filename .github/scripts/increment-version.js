async function getCurrentVersion() {
  const { path } = await import('path');
  const packageJsonPath = path.join(__dirname, `../projects/frontegg-app/package.json`);
  const pkg = await import(packageJsonPath);
  const [major = 0, minor = 0, patch = 0] = pkg.version.split('.').map(Number);
  return { major, minor, patch };
}

async function modifyVersion(newVersion) {
  const { writeFileSync } = await import('fs');
  const { path } = await import('path');
  const packageJsonPath = path.join(__dirname, `../projects/frontegg-app/package.json`);
  const pkg = await import(packageJsonPath);
  console.log('Modifying package.json', packageJsonPath);
  pkg.version = `${newVersion.major}.${newVersion.minor}.${newVersion.patch}`;
  writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
}


export default async (minorNeeded) => {
  const version = await getCurrentVersion();

  let newVersion = { ...version };

  console.log(`Current version: ${version.major}.${version.minor}.${version.patch}`);
  
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
  await modifyVersion(newVersion);
  console.log('new version', newVersion);
}


;
