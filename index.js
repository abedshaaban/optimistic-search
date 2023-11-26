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
    index = store.storage;
  }

  const query = "developer";
  const tokenized_query = await getTokens(query);

  console.log(tokenized_query);

  function result() {
    let outcome = [];

    for (let i = 0; i < store.storage.length; i++) {
      const element = store.storage[i];
      const subtract = tokenized_query - element.index;

      outcome.push({ value: subtract, path: element.id });
    }

    const sortedData = outcome.sort(
      (a, b) => Math.abs(a.value) - Math.abs(b.value)
    );

    console.log(sortedData);
  }

  result();
}

init();
