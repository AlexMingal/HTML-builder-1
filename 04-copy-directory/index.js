const path = require("path");

const { mkdir, readdir, copyFile, rm, stat } = require("fs/promises");

const input = path.join(__dirname, "files");
const output = path.join(__dirname, "files-copy");


async function copyDir(source, dest){ 
  // source = source folder, dest = destination folder 

  try {
    await rm(dest, {recursive: true});  
  } catch (error) {}

  try {    
    await mkdir(dest, {recursive: true });    
  } catch (error) { console.log(error) }    

  try {
    const elements = await readdir(source, { withFileTypes: true });
    elements.forEach((el) => {
      if(el.isFile()){
        copyFile(path.join(source, el.name), path.join(dest, el.name));
      } else {
        const newSource = path.join(input, el.name);
        const newDest = path.join(output, el.name);
        copyDir(newSource, newDest);
      }
    })
  } catch (error) { console.log(error) }
}

copyDir(input, output);
