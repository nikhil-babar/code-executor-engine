const express = require("express");
const app = express();
const codeRouter = require("./routes/code");
require("dotenv").config();
require('./utils/mongodb')

app.use(express.json());
app.use("/code", codeRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server listenning to port ${process.env.PORT || 5000}`)
);
