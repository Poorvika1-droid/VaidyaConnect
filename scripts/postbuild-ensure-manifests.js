const fs = require('fs');
const path = require('path');

function findNftFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      results.push(...findNftFiles(full));
    } else if (it.isFile() && it.name.endsWith('.js.nft.json')) {
      results.push(full);
    }
  }
  return results;
}

function ensureManifestFiles(nextServerAppDir) {
  const nftFiles = findNftFiles(nextServerAppDir);
  const created = [];

  for (const nftPath of nftFiles) {
    try {
      const content = fs.readFileSync(nftPath, 'utf8');
      // The file is not guaranteed to be strict JSON, but in our build it is JSON
      const parsed = JSON.parse(content);
      // Look for references to client manifest file(s)
      const text = content;
      const matches = Array.from(text.matchAll(/page_client-reference-manifest\.js/g));
      if (matches.length === 0) continue;

      const dir = path.dirname(nftPath);
      const manifestPath = path.join(dir, 'page_client-reference-manifest.js');
      if (!fs.existsSync(manifestPath)) {
        // Create a harmless CommonJS module export so Node can load/require it if needed
        fs.writeFileSync(manifestPath, 'module.exports = {};' + '\n', 'utf8');
        created.push(manifestPath);
      }
    } catch (err) {
      // ignore parse errors
    }
  }
  return created;
}

function main() {
  const nextServerAppDir = path.join(process.cwd(), '.next', 'server', 'app');
  if (!fs.existsSync(nextServerAppDir)) {
    console.log('No .next/server/app directory found; skipping manifest checks.');
    return;
  }

  const created = ensureManifestFiles(nextServerAppDir);
  if (created.length) {
    console.log('Created manifest files:');
    for (const p of created) console.log('  ' + p);
  } else {
    console.log('No missing manifest files found.');
  }
}

main();
