const express = require("express");
const app = express();
const codeRouter = require("./routes/code");
const cors = require('cors')
require("dotenv").config();
require('./utils/mongodb')

app.use(cors({
  origin: 'http://localhost:3001'
}))

app.use(express.json());
app.use("/code", codeRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server listenning to port ${process.env.PORT || 5000}`)
);
