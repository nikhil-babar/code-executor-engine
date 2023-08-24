const data = require("./data.json");

const ids = [];
const output = [];
const { default: axios } = require("axios");

async function run() {
  try {
    for (const json of data) {
      const res = await axios.post("http://localhost:5000/code", json);
      ids.push(res.data.submit_id);
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkOutput() {
  try {
    const startTime = Date.now();

    while (ids.length > 0) {
      const id = ids.shift();
      try {
        const res = await axios.get("http://localhost:5000/code", {
          params: {
            submit_id: id,
          },
        });

        if (res.status === 200) {
          const endTime = Date.now();
          const requestTimeInSeconds = (endTime - startTime) / 1000;
          console.log({
            submit_id: id,
            response: res.data,
            requestTimeInSeconds,
          })
          output.push({
            submit_id: id,
            response: res.data,
            requestTimeInSeconds,
          });
        } else {
          ids.push(id); // Push the id back to the queue for further polling
        }
      } catch (error) {
        // If there's an error, push the id back to the queue for further polling
        ids.push(id);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

run()
  .then(() => checkOutput())
  .then(() => {
    // Calculate and log the average long polling time
    const totalRequestTime = output.reduce(
      (total, obj) => total + obj.requestTimeInSeconds,
      0
    );
    const avgRequestTime =
      totalRequestTime / output.length || "No requests completed.";
    console.log("Total no of request executed:", output.length);
    console.log("Average long polling time in seconds:", avgRequestTime);
  });