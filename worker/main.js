const amqp = require("amqplib");
const CodeExecutor = require("./utils/CodeExecutor");
require("./utils/mongodb");
require("dotenv").config();

const Output = require("./models/output");

async function connect() {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.CODE_QUEUE);
    await channel.assertQueue(process.env.CLEANUP_QUEUE);

    channel.consume(process.env.CODE_QUEUE, async (job) => {
      try {
        const jsonString = job.content.toString();
        const submission = JSON.parse(jsonString);
        channel.ack(job);

        if (
          !submission?.code ||
          !submission?.filename ||
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

            channel.sendToQueue(
              process.env.CLEANUP_QUEUE,
              Buffer.from(
                JSON.stringify({
                  submit_id: submission.submit_id,
                  container_id: executor.container_id,
                })
              )
            );
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

            channel.sendToQueue(
              process.env.CLEANUP_QUEUE,
              Buffer.from(
                JSON.stringify({
                  submit_id: submission.submit_id,
                  container_id: executor.container_id,
                })
              )
            );
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
