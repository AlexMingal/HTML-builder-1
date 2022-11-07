const fs = require('fs');
const path = require('path');

const { readFile, mkdir, rm, readdir, copyFile } = require('fs/promises');

const output = path.join(__dirname, 'project-dist');


// function make directory
async function makeFolder(folder) {
  try {
    mkdir(folder, { recursive: true });
  } catch (error) {}
}

makeFolder(output); // Create directory 'project-dist' 


// function merging CSS 

const cssStream = fs.createWriteStream(path.join(output, 'style.css'));

const inputPath = path.join(__dirname, 'styles');

async function mergeCss() {
  try {
    const files = await readdir(inputPath, { withFileTypes: true });
    for (const file of files) {
      if (file.name.endsWith('.css')) {
        try {
          const cssData = await readFile(path.join(inputPath, file.name));
          cssStream.write(cssData);
        } catch (error) {}
      }
    }
  } catch (error) {}
}

mergeCss(); // building one merged .css file in 'project-dist' folder


// function for copy assets

const inputFolder = path.join(__dirname, 'assets');
const outputFolder = path.join(output, 'assets');

async function copyFolder(src, dest) {
  try {
    await rm(dest, { recursive: true });
  } catch (error) {}

  try {
    await mkdir(dest, { recursive: true });
  } catch (error) {
    console.log(error);
  }

  try {
    const elements = await readdir(src, { withFileTypes: true });
    elements.forEach((elem) => {
      if (elem.isFile()) {
        copyFile(path.join(src, elem.name), path.join(dest, elem.name));
      } else {
        const newInput = path.join(inputFolder, elem.name);
        const newOutput = path.join(outputFolder, elem.name);
        copyFolder(newInput, newOutput);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

copyFolder(inputFolder, outputFolder);


// Работа с шаблоном

const htmlStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'index.html')
);

let html = '';


async function readTemplate() {
  try {
    html = await readFile(path.join(__dirname, 'template.html'), {
      encoding: 'utf-8',
    });
    try {
      const files = await readdir(path.join(__dirname, 'components'), {withFileTypes: true});
      let counter = 0;      
      for (const file of files) {
        const fileName = file.name.split('.html').join('');
        html = html.split(`{{${fileName}}}`);        
        try {
          const htmlFromFile = await readFile(path.join(__dirname, 'components', file.name), {encoding: 'utf-8'});  
          
          html.splice(1, 0, htmlFromFile);
          html = html.join('');
          counter++;
          if(counter === files.length){
            htmlStream.write(html);
          }         
        } catch (error) {}        
      }      
    } catch (error) {}
  } catch (error) {}
}


readTemplate();