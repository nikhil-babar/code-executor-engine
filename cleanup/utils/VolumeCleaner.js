const { rmdir, readdir, unlink, lstat } = require("fs").promises;
const path = require("path");

class VolumeCleaner {
  constructor({ submit_id }) {
    this.submit_id = submit_id;
  }

  async cleanup(
    folderPath = `${process.env.ROOT_DIR}/${process.env.VOLUME}/${this.submit_id}`
  ) {
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

module.exports = VolumeCleaner;
