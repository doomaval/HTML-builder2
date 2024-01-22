const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');
const source = path.join(__dirname, '/styles/');
const destination = path.join(__dirname, '/project-dist/bundle.css');

mergeStyles();

async function mergeStyles() {
  const output = fs.createWriteStream(destination);
  const fileList = await fsp.readdir(source, { withFileTypes: true });
  // console.log(fileList);
  let data = '';
  for (let item of fileList) {
    if (item.isFile() && path.extname(item.name) === '.css') {
      // console.log(item.name);
      data += await fsp.readFile(path.join(source, item.name));
      data += os.EOL;
    }
  }
  await fsp.writeFile(destination, data);
}
