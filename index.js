import fs from "fs";
import { getTokens } from "./model/index.js";
import {
  getFiles,
  getFileData,
  getStore,
  saveToStore,
} from "./utilities/index.js";

let index = [];

async function init() {
  const store = await getStore();

  if (store?.storage?.length === 0) {
    // get files inside the base folder

    const files = getFiles(store.base_folder);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileData = await getFileData(file);
      await getTokens(fileData)
        .then((tokens) => {
          console.log(tokens);
          index.push({
            id: file,
            index: tokens,
            last_modified: fs.statSync(file).mtime,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    await saveToStore({ storage: index });
  } else {
    // check for out dated indexs by last modified date then load the storage
  }
}

init();
