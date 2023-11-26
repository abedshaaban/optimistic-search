import { getTokens } from "./model/index.js";
import { getFiles, getFileData } from "./utilities/index.js";

const baseFolder = "./local-files";

let index = [];

async function init() {
  const files = getFiles(baseFolder);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const fileData = await getFileData(file);

    await getTokens(fileData)
      .then((tokens) => {
        console.log(tokens);
        index.push({ id: file, index: tokens });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(index);
}

init();
