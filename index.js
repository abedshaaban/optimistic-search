import { getStore } from "./utilities/index.js";
import { Engine } from "./core/index.js";
import express from "express";
import cors from "cors";

const store = await getStore();
const searchEngine = new Engine(store.base_folder);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

if (store?.storage?.length === 0) {
  await searchEngine.indexFiles();
} else {
  searchEngine.setIndex(store.storage);
}

const app = express();
app.use(cors(corsOptions));
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
