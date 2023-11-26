import { PDFExtract } from "pdf.js-extract";
import { getTextExtractor } from "office-text-extractor";
import fs from "fs";
import { getFileExtension } from "./index.js";

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
        console.log(err);
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

/**
 * `readTxt` function extracts text from a txt file.
 *
 * @param path
 * @returns text read from a txt
 */
export function readTxt(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }

      resolve(data.toString());
    });
  });
}

/**
 * `getFileData` takes a file path and returns the data contained in that file
 *
 * @param filePath
 * @returns text in a file
 */
export async function getFileData(filePath) {
  let data;

  switch (await getFileExtension(filePath)) {
    case "pdf":
      data = await readPDF(filePath);
      break;

    case "docx":
      data = await readWord(filePath);
      break;

    case "txt":
      data = await readTxt(filePath);
      break;

    default:
      throw new Error("file type not supported yet!");
  }

  return data.replace(/\n/g, "");
}
