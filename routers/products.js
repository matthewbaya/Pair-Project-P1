"use strict";
const express = require("express");
const ProductCtrl = require("../ctrls/product");
const router = express.Router();

router.get("/", ProductCtrl.showProducts);
router.get("/add");
router.post("/add");
router.get("/edit/:productId");
router.post("/edit/:productId");
router.get("/:productId/order/:userId");
router.post("/:productId/order/:userId");
module.exports = router;
