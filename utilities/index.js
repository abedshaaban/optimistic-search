import { PDFExtract } from "pdf.js-extract";
import { readFile } from "node:fs/promises";
import { getTextExtractor } from "office-text-extractor";

const pdfExtract = new PDFExtract();
const wordExtractor = getTextExtractor();

export function readPDF(path) {
  const options = {};
  let text = "";

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
          text += line.str;
        }
      }
      resolve(text);
    });
  });
}

export async function readWord(path) {
  const text = await wordExtractor.extractText({ input: path, type: "file" });

  return text;
}
