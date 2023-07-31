const { writeFile, mkdir, rmdir, readdir, unlink, lstat } =
  require("fs").promises;
const path = require("path");
const ROOT_DIR = "/app";

class Volume {
  constructor({ volume, filename, foldername, lang, content }) {
    this.volume = volume;
    this.filename = filename;
    this.foldername = foldername;
    this.content = content;
    this.lang = lang;
  }

  async create() {
    try {
      const dirPath = `${ROOT_DIR}/${this.volume}/${this.foldername}`;
      const filePath = path.join(dirPath, `${this.filename}`);

      await mkdir(dirPath);
      await writeFile(filePath, this.content);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Volume
