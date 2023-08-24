const express = require("express");
const app = express();
const codeRouter = require("./routes/code");
const authRouter = require("./routes/auth");
const session = require("express-session");
const connectRedis = require("connect-redis").default;
const Redis = require("ioredis").default;
const cors = require("cors");
require("dotenv").config();
require("./utils/mongodb");

const redisClient = new Redis({
  host: "redis",
  port: 6379,
});

redisClient.on("connect", () => console.log("connected to redis"));

redisClient.on("error", (e) => console.log("Redis error: " + e.message));

const RedisStore = new connectRedis({
  client: redisClient,
  prefix: "session",
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(
  session({
    store: RedisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: { httpOnly: true },
  })
);

app.use(express.json());
app.use("/code", codeRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server listenning to port ${process.env.PORT || 5000}`)
);
