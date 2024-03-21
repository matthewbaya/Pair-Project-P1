"use strict";
const express = require("express");
const ProductCtrl = require("../ctrls/product");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/", ProductCtrl.showProducts);
router.get("/customer", ProductCtrl.customerPage);
router.get("/add", ProductCtrl.addProducts);
router.post("/add", upload.single("picture"), ProductCtrl.saveProduct);
router.get("/detail/:productId", ProductCtrl.detailProducts);
router.get("/edit/:productId", ProductCtrl.editProducts);
router.post(
  "/edit/:productId",
  upload.single("picture"),
  ProductCtrl.postEditProducts
);
router.get("/:productId/order/:userId");
router.post("/:productId/order/:userId");
router.get("/:productId/delete", ProductCtrl.deleteProduct);
module.exports = router;
