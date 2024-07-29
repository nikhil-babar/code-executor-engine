# Code-Xpert

### Demo

https://github.com/user-attachments/assets/546e192f-e1bf-4830-9aa8-67ba0ae7261c

![image](https://github.com/user-attachments/assets/bb8547cc-585f-418e-93f0-06f8aefa0995)

![image](https://github.com/user-attachments/assets/ee52dabb-94f4-4928-9ce8-e1693aa4f5ca)


## Overview

Code-Xpert is a micro-service code execution engine designed for fast, secure, and isolated code execution. It supports multiple programming languages, including C, C++, Python, Java, and Node.js. Built using Node.js, Docker, and RabbitMQ, Code-Xpert ensures that each code execution runs in an isolated environment, providing a robust and scalable solution for various coding needs.


## Prerequisites

Before setting up Code-Xpert locally, ensure you have the following installed on your machine:

- Docker
- Node.js
- Docker Compose


## Setup Instructions

Follow these steps to set up Code-Xpert locally:

### 1. Install Docker

Ensure Docker is installed on your machine. You can download Docker from [here](https://www.docker.com/get-started).

### 2. Clone the Repository

Clone the Code-Xpert repository to your local machine:

```bash
git clone https://github.com/nikhil-babar/code-executor-engine.git
cd code-executor-engine
```

### 3. Build Docker Images

Navigate to the `worker/images` directory and run the `build.sh` script to create Docker images for all supported languages:

```bash
cd worker/images
./build.sh
```

This script will create the necessary Docker images for each language, which will be used to create isolated containers for code execution.

### 4. Start the Services

Navigate back to the root directory and build and run the Docker Compose file:

```bash
cd ../..
docker-compose up --build
```

### 5. Verify the Setup

Examine the service logs to ensure that the database connection is established and the server is listening:

```bash
docker-compose logs
```

### 6. Test the Code Execution

Navigate to the `test` directory and run the `run.js` file to test the code execution service:

```bash
cd test
node run.js
```

You should see that each code execution has a separate container running.


## Output and Logs

Collect the logs and check the database for the output of the executed code. Ensure that each execution is isolated and secure.


## Contributing

If you would like to contribute to Code-Xpert, please follow the standard GitHub flow:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request


## License

Code-Xpert is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact [nikhilbabarjee@gmail.com].

---

By following these steps, you should be able to set up and run Code-Xpert locally, enabling you to execute code in an isolated and secure environment.
