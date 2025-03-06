/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function move(file, dest) {
  try {
    if (!file || !dest) {
      throw new Error('Source and Destination must be provide.');
    }

    if (file === dest) {
      return;
    }

    if (!fs.existsSync(file)) {
      throw new Error('Source does not exists.');
    }

    if (fs.statSync(file).isDirectory()) {
      throw new Error('Source is a directory, must be a file.');
    }

    let destPath = dest;

    if (dest[dest.length - 1] === '/') {
      destPath = path.join(dest, path.basename(file));
    }

    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      destPath = path.join(dest, path.basename(file));
    }

    if (fs.existsSync(destPath) && fs.statSync(destPath).isFile()) {
      throw new Error('Destination file already exists');
    }

    fs.renameSync(file, destPath);
  } catch (error) {
    console.error(error.message);
  }
}

const args = process.argv.slice(2);

move(...args);

module.exports = { move };
