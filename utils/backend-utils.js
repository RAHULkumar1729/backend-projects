// utils/backendUtils.js
const express = require('express');
const router = express.Router()
const dotenv = require('dotenv').config();
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const Joi = require('joi')

module.exports = {
  express,
  router,
  cookie,
  jwt,
  bcrypt,
  path,
  dotenv,
  Joi
};
