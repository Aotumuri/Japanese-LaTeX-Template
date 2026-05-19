const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const templateDir = path.join(rootDir, 'template');
const targetDir = path.join(rootDir, 'paper');
const fileNames = ['main.tex', 'references.bib'];
const directoryNames = ['figures', 'tables'];

fs.mkdirSync(targetDir, { recursive: true });

for (const fileName of fileNames) {
  const sourcePath = path.join(templateDir, fileName);
  const targetPath = path.join(targetDir, fileName);

  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
  }
}

for (const directoryName of directoryNames) {
  fs.mkdirSync(path.join(targetDir, directoryName), { recursive: true });
}

console.log('Initialized paper files from template/ under paper/.');
