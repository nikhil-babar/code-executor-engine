const Docker = require("dockerode");

class DockerCleaner {
  constructor({ submit_id, container_id }) {
    this.submit_id = submit_id;
    this.container_id = container_id;
    this.docker = new Docker();
  }

  async cleanup() {
    try {
      const container = this.docker.getContainer(this.container_id);

      try {
        await container.stop();
      } catch (error) {}

      await container.remove();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = DockerCleaner


