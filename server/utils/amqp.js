const amqp = require("amqplib");
require('dotenv').config()

class AMQP {
  constructor() {
    this.AMQP_STATUS = {
      connecting: "CONNECTING",
      connected: "CONNECTED",
      failure: "FAILURE",
    };

    this.status = this.AMQP_STATUS.connecting;
    this.connect()
      .then((connection) => {
        this.connection = connection;
        this.status = this.AMQP_STATUS.connected;
      })
      .catch((err) => {
        console.error(err)
        this.status = this.AMQP_STATUS.failure;
      });
  }

  async connect() {
    try {
      const connection = await amqp.connect(process.env.AMQP_URL);
      const channel = await connection.createChannel();

      await channel.assertQueue(process.env.QUEUE);

      return channel;
    } catch (error) {
      throw error;
    }
  }

  async sendJob(job) {
    try {
      while (this.status.localeCompare(this.AMQP_STATUS.connecting) == 0);

      if (this.status.localeCompare(this.AMQP_STATUS.failure) == 0) {
        return Promise.reject({ message: "connection failed" });
      }

      await this.connection.sendToQueue(
        process.env.QUEUE,
        Buffer.from(JSON.stringify(job))
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AMQP;
