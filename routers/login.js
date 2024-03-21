"use strict";
const express = require("express");
const Login = require("../ctrls/login");
const router = express.Router();

router.get("/", Login.login);
router.post("/", Login.saveLogin);

module.exports = router;
