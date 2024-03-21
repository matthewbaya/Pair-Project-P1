"use strict";
const express = require("express");
const Register = require("../ctrls/register");
const router = express.Router();

router.get("/", Register.register);
router.post("/", Register.saveRegister);

module.exports = router;
