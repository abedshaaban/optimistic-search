import { getTokens } from "./model/index.js";
import {
  readPDF,
  readWord,
  readTxt,
  getFileExtension,
  getFiles,
} from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  // async function getFileData(filePath) {
  //   let data;

  //   switch (await getFileExtension(filePath)) {
  //     case "pdf":
  //       data = await readPDF(filePath);
  //       break;

  //     case "docx":
  //       data = await readWord(filePath);
  //       break;

  //     case "txt":
  //       data = await readTxt(filePath);
  //       break;

  //     default:
  //       throw new Error("file type not supported yet!");
  //   }

  //   return data.replace(/\n/g, "");
  // }

  // const files = getFiles(baseFolder);

  // console.log(files);

  // for (let i = 0; i < files.length; i++) {
  //   const file = files[i];

  //   const fileData = await getFileData(file);
  //   console.log(fileData);
  // }

  const documents = "Your input text here";

  await getTokens(documents)
    .then((tokens) => {
      console.log(tokens);
    })
    .catch((error) => {
      console.error(error);
    });
}

init();
