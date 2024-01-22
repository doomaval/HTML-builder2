const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');
const os = require('os');
const file = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(file);

stdout.write("Input text (to file text.txt) or 'exit' > ");

stdin.on('data', (data) => {
  const dataString = data.toString();
  if (dataString === 'exit' + os.EOL) {
    exit();
  } else {
    output.write(dataString);
    stdout.write("Input another line or 'exit' > ");
  }
});

process.on('exit', () => stdout.write('\nWork finished.'));
process.on('SIGINT', () => exit());
