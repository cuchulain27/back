
'use strict'
const express = require('express');
const Mail2Controller = require('../controllers/mail2.controller');

const api = express.Router();

api.post('/sendMail2', Mail2Controller.sendMail2);

module.exports = api;