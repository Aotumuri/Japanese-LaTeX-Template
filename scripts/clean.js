const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const ignoredDirs = new Set(['.git', 'build', 'node_modules']);
const auxExtensions = new Set([
  '.aux',
  '.bbl',
  '.bcf',
  '.blg',
  '.dvi',
  '.fdb_latexmk',
  '.fls',
  '.idx',
  '.ilg',
  '.ind',
  '.lof',
  '.log',
  '.lot',
  '.out',
  '.toc',
  '.xdv'
]);
const auxSuffixes = ['.run.xml', '.synctex.gz'];

function isAuxFile(filePath) {
  const name = path.basename(filePath);
  return auxExtensions.has(path.extname(name)) || auxSuffixes.some((suffix) => name.endsWith(suffix));
}

function removeAuxFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        removeAuxFiles(fullPath);
      }
      continue;
    }

    if (entry.isFile() && isAuxFile(fullPath)) {
      fs.rmSync(fullPath, { force: true });
    }
  }
}

fs.rmSync(buildDir, { recursive: true, force: true });
removeAuxFiles(rootDir);
fs.mkdirSync(buildDir, { recursive: true });

console.log('Cleaned build directory and LaTeX auxiliary files.');
