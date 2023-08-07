const router = require("express").Router();
const config = require("../config");
const Output = require("../models/output");
const AMQP = require("../utils/amqp");
const randomString = require('randomstring')

const msgQueue = new AMQP();

router.post("/", async (req, res) => {
  try {
    const { code, input, filename, lang } = req.body;
    if (!code || !filename || !lang) return res.sendStatus(422);

    const submit_id = randomString.generate(10);
    const queue = config.queue[`${lang}_queue`]

    if(!queue) return res.sendStatus(422)

    if (msgQueue.sendJob({ submit_id, code, input, filename, lang }, queue)) {
      return res.status(201).json({ submit_id });
    } else {
      return res.sendStatus(500);
    }
    
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const submit_id = req.query.submit_id;
    const output = await Output.findOne({ submit_id });

    if (!output) {
      return res.sendStatus(404);
    }

    await Output.deleteOne({ submit_id });

    res.status(200).json(output);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
