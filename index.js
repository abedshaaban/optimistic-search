import {
  readPDF,
  readWord,
  readTxt,
  getFileExtension,
} from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  const pdfData = await readPDF(`${baseFolder}/pdf-sample.pdf`);

  console.log(pdfData);

  const wordData = await readWord(`${baseFolder}/word-sample.docx`);

  console.log(wordData);

  const txTData = await readWord(`${baseFolder}/txt-sample.txt`);

  console.log(txTData);

  console.log(getFileExtension("pdf-smaple.pdf"));
}

init();
