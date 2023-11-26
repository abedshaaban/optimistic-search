import fs from "fs";

/**
 * `getFileExtension` takes a file name and returns the file extension.
 *
 * @param fileName
 * @returns file exyension name
 */
export function getFileExtension(fileName) {
  const fileSplite = fileName.split(".");
  const fileExtenstion = fileSplite.pop();

  return fileExtenstion;
}

/**
 * `getFiles` takes a flolder path and returns every single file path in it
 *
 * @param folderPath
 * @returns file paths in a folder
 */
export function getFiles(folderPath) {
  let fileList = [];

  const paths = fs.readdirSync(folderPath, { withFileTypes: true });

  for (let i = 0; i < paths.length; i++) {
    const element = paths[i];
    const currentPath = `${folderPath}/${element.name}`;

    if (element.isFile()) {
      fileList.push(currentPath);
    } else if (element.isDirectory()) {
      const folderPaths = getFiles(currentPath);

      fileList.push(...folderPaths);
    } else {
      throw new Error("file type not supported.");
    }
  }

  return fileList;
}
