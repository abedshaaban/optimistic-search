import { readPDF, readWord } from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  const pdfData = await readPDF(`${baseFolder}/pdf-sample.pdf`);

  console.log(pdfData);

  const wordData = await readWord(`${baseFolder}/word-sample.docx`);

  console.log(wordData);
}

init();
