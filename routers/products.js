"use strict";
const express = require("express");
const ProductCtrl = require("../ctrls/product");
const router = express.Router();

router.get("/", ProductCtrl.showProducts);
router.get("/add", ProductCtrl.addProducts);
router.post("/add", ProductCtrl.saveProduct);
router.get("/edit/:productId", ProductCtrl.editProducts);
router.post("/edit/:productId", ProductCtrl.postEditProducts);
router.get("/:productId/order/:userId");
router.post("/:productId/order/:userId");
router.get("/:productId/delete", ProductCtrl.deleteProduct);
module.exports = router;
