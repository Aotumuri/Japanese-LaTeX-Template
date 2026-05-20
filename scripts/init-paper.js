const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const templateDir = path.join(rootDir, 'template');
const targetDir = path.join(rootDir, 'paper');
const fileNames = ['main.tex', 'references.bib'];
const directoryNames = ['figures', 'tables', 'styles'];
const args = process.argv.slice(2);
const allowedArgs = new Set(['--force', '-f']);
const force = args.some((arg) => allowedArgs.has(arg));
const unknownArgs = args.filter((arg) => !allowedArgs.has(arg));

if (unknownArgs.length > 0) {
  console.error(`Unknown option: ${unknownArgs.join(', ')}`);
  console.error('Usage: npm run init:paper or npm run init:paper:force');
  process.exit(1);
}

if (fs.existsSync(targetDir) && !force) {
  console.error('paper/ already exists. Use npm run init:paper:force to overwrite template files.');
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const fileName of fileNames) {
  const sourcePath = path.join(templateDir, fileName);
  const targetPath = path.join(targetDir, fileName);

  if (force || !fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
  }
}

for (const directoryName of directoryNames) {
  fs.mkdirSync(path.join(targetDir, directoryName), { recursive: true });
}

const styleSourcePath = path.join(templateDir, 'styles', 'paper.sty');
const styleTargetPath = path.join(targetDir, 'styles', 'paper.sty');

if (force || !fs.existsSync(styleTargetPath)) {
  fs.copyFileSync(styleSourcePath, styleTargetPath);
}

console.log('Initialized paper files from template/ under paper/.');
