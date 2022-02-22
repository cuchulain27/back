/* 
ruta: api/blog
*/

'use strict'
const express = require('express');
const MailController = require('../controllers/mail.controller');

const api = express.Router();

api.post('/sendMail', MailController.sendMail);

module.exports = api;