const amqp = require("amqplib");
const DockerCleaner = require("./utils/DockerCleaner");
const VolumeCleaner = require("./utils/VolumeCleaner");

async function connect() {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.CLEANUP_QUEUE);

    channel.consume(process.env.CLEANUP_QUEUE, async (job) => {
      try {
        const Job = JSON.parse(job.content.toString());
        channel.ack(job);
        
        if (!Job || !Job.submit_id || !Job.container_id) return;

        console.log(Job)

        try {
          await new DockerCleaner({ ...Job }).cleanup();
        } catch (error) {
          console.error(error);
        }

        try {
          await new VolumeCleaner({ ...Job }).cleanup();
        } catch (error) {
          console.error(error);
        }
        
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
