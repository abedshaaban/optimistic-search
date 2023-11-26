import {
  readPDF,
  readWord,
  readTxt,
  getFileExtension,
  getFiles,
} from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  async function getFileData(filePath) {
    switch (await getFileExtension(filePath)) {
      case "pdf":
        console.log(await readPDF(filePath));
        break;

      case "docx":
        console.log(await readWord(filePath));
        break;

      case "txt":
        console.log(await readTxt(filePath));
        break;

      default:
        throw new Error("file type not supported yet!");
    }
  }

  const files = getFiles(baseFolder);

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    console.log(await getFileData(file));
  }
}

init();
