const amqp = require("amqplib");
const config = require('../config')
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

      for(const queue of Object.values(config.queue)){
        await channel.assertQueue(queue)
      }

      return channel;
    } catch (error) {
      throw error;
    }
  }

  sendJob(job, queue) {
    try {
      while (this.status.localeCompare(this.AMQP_STATUS.connecting) == 0);

      if (this.status.localeCompare(this.AMQP_STATUS.failure) == 0) {
        return false;
      }

      this.connection.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(job))
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AMQP;
