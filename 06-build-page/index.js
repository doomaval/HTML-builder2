// const fs = require("fs");
const fsp = require('fs/promises');
const path = require('path');
const os = require('os');
const source = path.join(__dirname);
const dest = path.join(__dirname, '/project-dist/');
const re = /{{\w+}}/;
let template = '';
let page = '';
buildPage();

async function buildPage() {
  await fsp.rm(dest, { recursive: true, force: true });
  await fsp.mkdir(dest);
  await fsp.mkdir(path.join(dest, '/assets/'));
  template = await fsp.readFile(path.join(source, '/template.html'), 'utf8');

  while (re.test(template)) {
    let componentName = template.match(re)[0];
    // console.log(componentName);
    const component = await fsp.readFile(
      path.join(source, `/components/${componentName.slice(2, -2)}.html`),
      'utf8',
    );
    template = template.replace(componentName, component);
  }
  fsp.writeFile(path.join(dest, '/index.html'), template);
  // console.log(p  ath.join(source, "/assets/"), path.join(dest, "/assets/"));

  await mergeStyles();

  copyFolder(path.join(source, '/assets/'), path.join(dest, '/assets/'));
}

async function mergeStyles() {
  // const output = fs.createWriteStream(dest);
  const fileList = await fsp.readdir(path.join(source, '/styles/'), {
    withFileTypes: true,
  });
  // console.log(fileList);
  let data = '';
  for (let item of fileList) {
    if (item.isFile() && path.extname(item.name) === '.css') {
      // console.log(item.name);
      data += await fsp.readFile(path.join(source, '/styles/', item.name));
      data += os.EOL;
    }
  }
  fsp.writeFile(path.join(dest, '/style.css'), data);
}

async function copyFolder(sourceFolder, destFolder) {
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
