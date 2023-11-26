import { PDFExtract } from "pdf.js-extract";

export function readPDF(path) {
  const pdfExtract = new PDFExtract();
  const options = {};
  let dataRead = "";

  return new Promise((resolve, reject) => {
    pdfExtract.extract(path, options, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      for (let i = 0; i < data?.pages.length; i++) {
        const page = data?.pages[i];
        for (let j = 0; j < page?.content?.length; j++) {
          const line = page?.content[j];
          dataRead += line.str;
        }
      }
      resolve(dataRead);
    });
  });
}
