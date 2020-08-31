const express = require('express');

const Joi = require('joi');

const app = express();
const config = require('./config');


app.use(express.json());

app.get('/hello', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('Hello world!');
});

app.get(
  '/weather',
  (req, res, next) => {
    const weatherRules = Joi.object({
      lat: Joi.string().required(),
      lon: Joi.string().required(),
    });

    const validationResult = weatherRules.validate(req.query);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  },
  (req, res, next) => {
    console.log('req.query', req.query);
    res.json({ weather: 'test' });
  },
);

app.listen(config.port, () => {
  console.log(`Started listening on port ${config.port}`);
});
