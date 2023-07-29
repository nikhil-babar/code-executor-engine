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

  async delete(folderPath = `${ROOT_DIR}/${this.volume}/${this.foldername}`) {
    try {
      const directory = await readdir(folderPath);

      for (const dirs of directory) {
        const subDirPath = path.join(folderPath, dirs);
        const dirDescription = await lstat(subDirPath);

        if (dirDescription.isDirectory()) {
          await this.delete(subDirPath);
        } else {
          await unlink(subDirPath);
        }
      }

      await rmdir(folderPath);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Volume
