const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

// console.log(path.join(__dirname), 'text.txt');
stream.on('data', chunk => console.log(chunk));
stream.on('error', error => console.log('Error', error.message));
