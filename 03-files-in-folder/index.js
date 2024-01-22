const { stdout } = process;
const fs = require('node:fs/promises');
const path = require('path');
const dir = path.join(__dirname, '/secret-folder/');

main();

async function main() {
  const list = await fs.readdir(dir, { withFileTypes: true });
  // console.log(list);
  for (let item of list) {
    if (item.isFile()) {
      const fileStat = await fs.stat(
        path.join(__dirname, '/secret-folder/', item.name),
      );
      // console.log(fileStat);
      const fileInfo = `${path.basename(
        item.name,
        path.extname(item.name),
      )} - ${path.extname(item.name).slice(1)} - ${fileStat.size} bytes`;
      console.log(fileInfo);
    }
  }
}
