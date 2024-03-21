"use strict";
const express = require("express");
const router = express.Router();

router.get("/");
// router.post("/");
router.get("/:userId/detail");

module.exports = router;
