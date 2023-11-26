import { getStore } from "./utilities/index.js";
import { Engine } from "./core/index.js";
import express from "express";

const store = await getStore();
const searchEngine = new Engine(store.base_folder);

if (store?.storage?.length === 0) {
  await searchEngine.indexFiles();
} else {
  searchEngine.setIndex(store.storage);
}

const app = express();
const port = 5555;

app.get("/search", async (req, res) => {
  let results;
  const query = req.query.q;

  if (query) {
    results = await searchEngine.search(query);
  } else {
    results = searchEngine.index;
  }

  res.status(200).send(results);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
