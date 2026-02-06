/**
 * Express app (PRD §6.1). REST API.
 */
const express = require('express');
const choiceOptimizerRouter = require('./routes/choice-optimizer');

const app = express();

app.use(express.json());
app.use('/api/choice-optimizer', choiceOptimizerRouter);

module.exports = app;
