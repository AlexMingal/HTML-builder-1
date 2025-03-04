const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');


async function readDirectory() {
  try {

    const files = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    files.forEach( file => {
      if (file.isFile()) {

        const filename = file.name.split('.'); 
        const ext =  (path.extname(file.name)).slice(1, path.extname(file.name).length);
        const pathToCheck = path.join(__dirname, 'secret-folder', file.name);

        fs.stat(pathToCheck, (error, stats) => {
          if(!error){
            console.log(filename[0] + " - " + ext + ' - ' + stats.size +' bytes');
          }           
        }); 
      }
    });
  } 
    catch (error) {
    console.log(error);
  }  
}


readDirectory();