const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pdfPath = path.join(rootDir, 'build', 'main.pdf');

function openerForPlatform(platform) {
  if (platform === 'darwin') {
    return { command: 'open', args: [pdfPath] };
  }

  if (platform === 'linux') {
    return { command: 'xdg-open', args: [pdfPath] };
  }

  if (platform === 'win32') {
    return { command: 'cmd', args: ['/c', 'start', '', pdfPath] };
  }

  return null;
}

if (!fs.existsSync(pdfPath)) {
  console.error('PDF not found. Run npm run build first.');
  process.exit(1);
}

const opener = openerForPlatform(process.platform);

if (!opener) {
  console.error(`Unsupported platform: ${process.platform}`);
  process.exit(1);
}

const child = spawn(opener.command, opener.args, {
  detached: true,
  stdio: 'ignore'
});

child.on('error', (error) => {
  console.error(`Failed to open PDF: ${error.message}`);
  process.exit(1);
});

child.unref();
console.log(`Opened ${path.relative(rootDir, pdfPath)}`);
