import {
  readPDF,
  readWord,
  readTxt,
  getFileExtension,
  getFiles,
} from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  const files = getFiles(baseFolder);

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    switch (getFileExtension(file)) {
      case "pdf":
        console.log(await readPDF(file));
        break;

      case "docx":
        console.log(await readWord(file));
        break;

      case "txt":
        console.log(readTxt(file));
        break;

      default:
        throw new Error("file type not supported yet!");
    }
  }
}

init();
