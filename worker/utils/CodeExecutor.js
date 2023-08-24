const Docker = require("dockerode");
const Volume = require("./Volume");
const EventEmitter = require("events");
require("dotenv").config();
const ROOT_DIR = process.env.DOCKER_ROOT_DIR;
const VOLUME = process.env.VOLUME;

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
    });
    this.network = "code-engine";
  }

  async collectLogs() {
    try {
      return await this.volume.read({
        filename: "output.txt",
        foldername: this.submit_id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createContainer() {
    try {
      const container = await this.docker.createContainer({
        Image: this.lang,
        name: this.submit_id,
        Env: Object.entries({
          id: this.submit_id,
          filename: this.filename.split(".")[0],
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
      console.log(error);
      throw error;
    }
  }

  async trackContainer({ retry_no }) {
    try {
      if (retry_no <= 0) {
        this.emit(this.OUPUT_STATUS.failed);
        return;
      }

      const res = await this.docker.getContainer(this.container_id).inspect();
      const waiting_time = parseInt(process.env.WAITING_TIME);

      if (res.State.Status.localeCompare("exited") == 0) {
        try {
          const output = await this.collectLogs();
          this.emit(this.OUPUT_STATUS.success, output);
        } catch (error) {
          this.emit(this.OUPUT_STATUS.failed);
          return;
        }
      } else {
        setTimeout(
          () => this.trackContainer({ retry_no: --retry_no }),
          waiting_time
        );
      }
    } catch (error) {
      console.log(error);
      this.emit(this.OUPUT_STATUS.failed);
    }
  }

  async runCode() {
    try {
      await this.volume.create({
        filename: this.filename,
        foldername: this.submit_id,
        content: this.code,
      });

      if (this.input && this.input.length > 0) {
        await this.volume.create({
          filename: "input.txt",
          foldername: this.submit_id,
          content: this.input,
        });
      }

      await this.createContainer();
      await this.trackContainer({ retry_no: parseInt(process.env.RETRY_NO) });
    } catch (error) {
      console.log(error);
      this.emit(this.OUPUT_STATUS.failed);
    }
  }
}

module.exports = CodeExecutor;
