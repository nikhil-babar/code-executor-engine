const amqp = require("amqplib");
const CodeExecutor = require("./utils/CodeExecutor");
const mongoose = require("./utils/mongodb");
const Output = require("./models/output");

const CODE_QUEUE = "code-execution";
const AMQP_URL = "amqp://rabbitmq:5672";

async function connect() {
  try {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(CODE_QUEUE);

    channel.consume(CODE_QUEUE, async (job) => {
      try {
        const jsonString = job.content.toString();
        const submission = JSON.parse(jsonString);
        channel.ack(job);

        if (
          !submission?.code ||
          !submission?.filename ||
          !submission?.input ||
          !submission?.submit_id ||
          !submission?.lang
        ) {
          return;
        }

        const executor = new CodeExecutor({
          ...submission,
        });

        await executor.runCode();

        executor.on(executor.OUPUT_STATUS.success, async (data) => {
          try {
            await new Output({
              ...submission,
              output: data,
              status: 200,
            }).save();
          } catch (error) {
            console.error(error);
          }
        });

        executor.on(executor.OUPUT_STATUS.failed, async () => {
          try {
            await new Output({
              ...submission,
              status: 422,
            }).save();
          } catch (error) {
            console.error(error);
          }
        });
        
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

connect()
  .then(() => {})
  .catch((err) => console.error(err));
