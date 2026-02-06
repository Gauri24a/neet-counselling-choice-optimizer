/**
 * Choice optimizer routes (PRD §4.1).
 */
const express = require('express');
const choiceOptimizerController = require('../controllers/choiceOptimizerController');

const router = express.Router();

router.post('/generate', choiceOptimizerController.generate);

module.exports = router;
