const Docker = require("dockerode");
const EventEmitter = require("events");
const Volume = require('./Volume')
const ROOT_DIR = "/app";
const VOLUME = "shared_volume";

class CodeExecutor extends EventEmitter {
  constructor({ code, input, filename, submit_id, lang }) {
    super();
    this.code = code;
    this.input = input;
    this.filename = filename;
    this.submit_id = submit_id;
    this.lang = lang;
    this.OUPUT_STATUS = {
      success: "SUCCESS",
      failed: "FAILED",
    };
    this.docker = new Docker();
    this.volume = new Volume({
      volume: VOLUME,
      filename,
      foldername: submit_id,
      lang: this.lang,
      content: this.code,
    });
    this.network = "code-engine";
  }

  async collectLogs() {
    try {
      const container = this.docker.getContainer(this.container_id);

      return await new Promise((resolve, reject) => {
        container.logs(
          { follow: true, stdout: true, stderr: true },
          async (err, stream) => {
            if (err) {
              reject(err);
            } else {
              let data = [];

              stream.on("data", (chunk) => {
                data.push(chunk);
              });

              stream.on("end", () => {
                const res = data.join("")
                resolve(res)
              });
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  }

  async cleanup() {
    try {
      const container = this.docker.getContainer(this.container_id);
      const status = await container.inspect();

      if (status.State.Running) await container.stop();

      await container.remove();
      this.volume.delete();
    } catch (error) {
      console.error(error);
    }
  }

  async createContainer() {
    try {
      const container = await this.docker.createContainer({
        Image: this.lang,
        name: this.submit_id,
        Env: Object.entries({
          id: this.submit_id,
          filename: this.filename.split('.')[0],
        }).map(([key, value]) => `${key}=${value}`),
        HostConfig: {
          Binds: [
            `${this.network}_${this.volume.volume}:${ROOT_DIR}/${this.volume.volume}`,
          ],
        },
      });

      await container.start();

      this.container_id = container.id;
    } catch (error) {
      throw error;
    }
  }

  async trackContainer({ retry_no }) {
    try {
      if (retry_no <= 0) {
        this.emit(this.OUPUT_STATUS.failed);
        this.cleanup();
      }

      const res = await this.docker.getContainer(this.container_id).inspect();

      if (res.State.Status.localeCompare("exited") == 0) {
        this.emit(this.OUPUT_STATUS.success, await this.collectLogs());
        await this.cleanup();
      } else {
        setTimeout(() => this.trackContainer({ retry_no: --retry_no }), 500);
      }
    } catch (error) {
      throw error;
    }
  }

  async runCode() {
    try {
      await this.volume.create();
      await this.createContainer();
      await this.trackContainer({ retry_no: 5 });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CodeExecutor
