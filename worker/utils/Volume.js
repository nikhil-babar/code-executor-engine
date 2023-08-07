const { writeFile, mkdir } =
  require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");

class Volume {
  constructor({ volume }) {
    this.volume = volume;
  }

  async create({ filename, foldername, content }) {
    try {
      const dirPath = `${process.env.DOCKER_ROOT_DIR}/${this.volume}/${foldername}`;
      const filePath = path.join(dirPath, `${filename}`);

      if (!existsSync(dirPath)) {
        await mkdir(dirPath);
      }
      await writeFile(filePath, content);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Volume;
