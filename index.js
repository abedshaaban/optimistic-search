import fs from "fs";
import { getTokens } from "./model/index.js";
import {
  getFiles,
  getFileData,
  readJson,
  getStore,
} from "./utilities/index.js";

let index = [];

async function init() {
  const store = await getStore();

  console.log(store);

  // const files = getFiles(baseFolder);

  // for (let i = 0; i < files.length; i++) {
  //   const file = files[i];

  //   const fileData = await getFileData(file);

  //   await getTokens(fileData)
  //     .then((tokens) => {
  //       console.log(tokens);
  //       index.push({ id: file, index: tokens });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // const store = await readJson("./store.json");
  // console.log(store);
}

init();
