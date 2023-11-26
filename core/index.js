import fs from "fs";
import { getTokens } from "../model/index.js";
import { getFileData, getFiles, saveToStore } from "../utilities/index.js";

/**
 * `Page` class, takes a path for the file and the token of the content.
 *
 * @param path file path.
 * @param token token after tokenizing.
 */
class Page {
  constructor(path, token) {
    this.path = path;
    this.index = token;
    this.lastModified = fs.statSync(path).mtime;
  }
}

/**
 * `Engine` class for the search engine. Takes baseFolder as a param to
 * initialize and contains the index of the pages.
 *
 * @param baseFolder folder to search in.
 *
 * @returns an engine that can index ad search in a folder.
 *
 */
export class Engine {
  constructor(baseFolder) {
    this.baseFolder = baseFolder;
    this.index = [];
  }

  async indexFiles() {
    const files = await getFiles(this.baseFolder);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileData = await getFileData(file);

      const tokens = await getTokens(fileData);

      this.index.push(new Page(file, tokens));
    }

    await saveToStore({ storage: this.index });
  }

  async search(query) {
    const tokenizedQuery = await getTokens(query);

    const outcome = [];

    for (let i = 0; i < this.index.length; i++) {
      const element = this.index[i];
      const subtract = tokenizedQuery - element.index;

      outcome.push({ value: subtract, path: element.path });
    }

    const data = outcome.sort((a, b) => Math.abs(a.value) - Math.abs(b.value));

    return data;
  }

  setIndex(dict) {
    this.index = [...dict];
  }
}
