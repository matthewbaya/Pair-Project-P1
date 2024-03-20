const express = require("express");
const router = express.Router();

router.use("/register", require("./register"));
router.use("/login", require("./login"));

router.get("/");

router.use("/products", require("./products"));
router.use("/users", require("./users"));

module.exports = router;
