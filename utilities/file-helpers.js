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
