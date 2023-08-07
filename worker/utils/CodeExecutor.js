const Docker = require("dockerode");
const EventEmitter = require("events");
const Volume = require("./Volume");
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
    });
    this.network = "code-engine";
  }

  async collectLogs() {
    try {
      const container = this.docker.getContainer(this.container_id);

      return await new Promise((resolve, reject) => {
        container.logs(
          { follow: true, stdout: true, stderr: true, timestamps: false },
          async (err, stream) => {
            if (err) {
              reject(err);
            } else {
              let data = [];

              stream.setEncoding('utf8');

              stream.on("data", (chunk) => {
                data.push(chunk);
              });

              stream.on("end", () => {
                const res = data.join("");
                resolve(res);
              });
            }
          }
        );
      });
    } catch (error) {
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
      throw error;
    }
  }

  async trackContainer({ retry_no }) {
    try {
      if (retry_no <= 0) {
        this.emit(this.OUPUT_STATUS.failed);
      }

      const res = await this.docker.getContainer(this.container_id).inspect();

      if (res.State.Status.localeCompare("exited") == 0) {
        let output = null;

        try {
          output = await this.collectLogs();
        } catch (error) {}

        this.emit(this.OUPUT_STATUS.success, output);
      } else {
        setTimeout(() => this.trackContainer({ retry_no: --retry_no }), 500);
      }
    } catch (error) {
      throw error;
    }
  }

  async runCode() {
    try {
      await this.volume.create({
        filename: this.filename,
        foldername: this.submit_id,
        content: this.code,
      });

      if(this.input && this.input.length > 0){
        await this.volume.create({
          filename: 'input.txt',
          foldername: this.submit_id,
          content: this.input
        })
      }

      await this.createContainer();
      await this.trackContainer({ retry_no: 5 });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CodeExecutor;
