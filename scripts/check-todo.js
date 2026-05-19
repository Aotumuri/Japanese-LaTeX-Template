const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDirs = ['paper', 'template'].map((dir) => path.join(rootDir, dir));
const targetExtensions = new Set(['.tex', '.bib', '.sty']);
const todoPattern = /^\s*%\s+(TODO|FIXME)\b/;

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

const findings = [];

for (const sourceDir of sourceDirs) {
  for (const filePath of collectFiles(sourceDir)) {
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    lines.forEach((line, index) => {
      const match = line.match(todoPattern);

      if (match) {
        findings.push({
          file: path.relative(rootDir, filePath),
          line: index + 1,
          term: match[1].toUpperCase(),
          text: line.trim()
        });
      }
    });
  }
}

if (findings.length === 0) {
  console.log('No % TODO or % FIXME comments found.');
  process.exit(0);
}

console.error('% TODO/% FIXME remains in paper sources:');

for (const finding of findings) {
  console.error(`${finding.file}:${finding.line}: ${finding.term}: ${finding.text}`);
}

process.exit(1);
