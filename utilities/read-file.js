import { PDFExtract } from "pdf.js-extract";
import { getTextExtractor } from "office-text-extractor";

/**
 * initialize instances
 */
const pdfExtract = new PDFExtract();
const wordExtractor = getTextExtractor();

/**
 * `readPDF` function extracts text from a pdf file.
 *
 * @param path
 * @returns text read from a pdf
 */
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

/**
 * `readWord` function extracts text from a docx file.
 *
 * @param path
 * @returns text read from a docx
 */
export async function readWord(path) {
  const text = await wordExtractor.extractText({ input: path, type: "file" });

  return text;
}
