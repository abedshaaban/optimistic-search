import { readPDF } from "./utilities/index.js";

const baseFolder = "./local-files";

async function init() {
  const pdfData = await readPDF(`${baseFolder}/pdf-sample.pdf`);

  console.log(pdfData);
}

init();
