import { getStore } from "./utilities/index.js";
import { Engine } from "./core/index.js";

async function init() {
  const store = await getStore();
  const searchEngine = new Engine(store.base_folder);

  if (store?.storage?.length === 0) {
    await searchEngine.indexFiles();
  } else {
    searchEngine.setIndex(store.storage);
  }

  const results = await searchEngine.search("ai");

  console.log(results);
}

init();
