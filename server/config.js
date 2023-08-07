require("dotenv").config();

module.exports = {
  queue: {
    java_queue: process.env.JAVA_QUEUE,
    cpp_queue: process.env.CPP_QUEUE,
    python_queue: process.env.PYTHON_QUEUE,
    javascript_queue: process.env.JAVASCRIPT_QUEUE,
    c_queue: process.env.C_QUEUE
  },
};
