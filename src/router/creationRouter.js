const express = require('express');

const CreationController = require('../controller/creationController');

const CreationRouter = express.Router();

CreationRouter.post('/restaurant', CreationController.createRes);

module.exports = {CreationRouter}