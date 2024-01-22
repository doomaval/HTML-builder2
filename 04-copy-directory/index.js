const fsp = require('fs/promises');
const path = require('path');
const source = path.join(__dirname, '/files/');
const destination = path.join(__dirname, '/files-copy/');

copyFolder(source, destination);

async function copyFolder(sourceFolder, destFolder) {
  await fsp.rm(destFolder, { recursive: true, force: true });
  await fsp.mkdir(destFolder, { recursive: true });
  const list = await fsp.readdir(sourceFolder, { withFileTypes: true });
  // console.log(list);
  for (let item of list) {
    // console.log(item);
    if (item.isFile()) {
      fsp.copyFile(
        path.join(sourceFolder, item.name),
        path.join(destFolder, item.name),
      );
    } else if (item.isDirectory) {
      await fsp.mkdir(path.join(destFolder, item.name), { recursive: true });
      copyFolder(
        path.join(sourceFolder, item.name),
        path.join(destFolder, item.name),
      );
    }
  }
}
