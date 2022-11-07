const fs = require('fs');
const path = require('path');

const { readdir, readFile } = require('fs/promises');


const cssStream = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css")
);

const inputDir = path.join(__dirname, "styles");


async function mergeCss(){
    try {
    const files = await readdir(inputDir, {withFileTypes: true}); 

    for (const file of files)  {
      if (file.name.endsWith('.css')){
        try{
          const cssLines = await readFile(path.join(inputDir, file.name));
          cssStream.write(cssLines);
        }
        catch (error) {}        
      }
    }      
  } catch (error) {console.log(error)}
}


mergeCss();