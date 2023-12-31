import fs from "fs";

/**
 * `getStore` returns the store.json value
 *
 * @returns
 */
export function getStore() {
  let store;

  if (fs.existsSync("./store.json")) {
    store = JSON.parse(fs.readFileSync("./store.json", "utf-8"));
  } else {
    fs.writeFile(
      "./store.json",
      JSON.stringify({
        last_updated: Date.now().toString(),
        base_folder: "./local-files",
        storage: [],
      }),
      (err) => {
        if (err) {
          console.error(err);
          throw new Error("Error occurred when creating a new store.");
        }
        console.log("File has been created");
      }
    );
  }

  return store;
}

/**
 * `saveToStore` update keys in the store.json file.
 *
 * @param object key and value to update
 */
export async function saveToStore(object) {
  const store = JSON.parse(fs.readFileSync("./store.json", "utf-8"));

  fs.writeFile(
    "./store.json",
    JSON.stringify({ ...store, ...object }),
    (err) => {
      if (err) {
        console.error(err);
        throw new Error("Error occurred when creating a new store.");
      }
      console.log("File has been created");
    }
  );
}
