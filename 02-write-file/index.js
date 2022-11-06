const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const process = require('process');
const { stdin, stdout } = process;


stdout.write('Привет. Ну шо там? :)\n');
stdin.on('data', data => {
  console.log('Учту. Есть что добавить?');
  if (data.includes('exit')) process.exit();
  else output.write(data);
});

process.on('exit', () => {
  stdout.write('\nНу нет, так нет. Сохраняю и ухожу! :)')
  console.log('\nЗаписано в файл:\n', path.join(__dirname, 'text.txt')) 
  });

process.on('SIGINT', () => process.exit());