const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDirs = ['paper', 'paper.example', 'template'].map((dir) => path.join(rootDir, dir));
const checkOnly = process.argv.includes('--check');
const targetExtensions = new Set(['.tex', '.bib', '.sty']);

function collectFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }

    if (entry.isFile() && targetExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalize(content) {
  return content.replace(/、/g, '，').replace(/。/g, '．');
}

const changedFiles = [];

for (const sourceDir of sourceDirs) {
  for (const filePath of collectFiles(sourceDir)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const normalized = normalize(content);

    if (content === normalized) {
      continue;
    }

    changedFiles.push(path.relative(rootDir, filePath));

    if (!checkOnly) {
      fs.writeFileSync(filePath, normalized);
    }
  }
}

if (changedFiles.length === 0) {
  console.log('No punctuation changes needed.');
  process.exit(0);
}

for (const file of changedFiles) {
  console.log(`${checkOnly ? 'Needs normalization' : 'Normalized'}: ${file}`);
}

if (checkOnly) {
  process.exit(1);
}
