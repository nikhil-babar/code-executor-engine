const { writeFile, mkdir, readFile } = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");

require("dotenv").config();

class Volume {
  constructor({ volume }) {
    this.volume = volume;
  }

  async create({ filename, foldername, content }) {
    try {
      const dirPath = path.join(
        process.env.DOCKER_ROOT_DIR,
        this.volume,
        foldername
      );
      const filePath = path.join(dirPath, filename);

      if (!existsSync(dirPath)) {
        await mkdir(dirPath);
      }
      await writeFile(filePath, content);
    } catch (error) {
      throw error;
    }
  }

  async read({ filename, foldername }) {
    try {
      const dirPath = path.join(
        process.env.DOCKER_ROOT_DIR,
        this.volume,
        foldername
      );
      const filePath = path.join(dirPath, filename);

      const output = await readFile(filePath, { encoding: "utf8" });

      return output;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Volume;
