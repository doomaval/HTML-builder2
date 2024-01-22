const fs = require('fs');
const path = require('path');
const { stdout } = process;

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
// const output = fs.createWriteStream(stdout);
let data = '';

input.on('data', (part) => (data += part));
input.on('end', () => console.log(data));
