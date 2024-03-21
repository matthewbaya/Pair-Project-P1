const express = require("express");
const router = express.Router();

router.use("/register", require("./register"));
router.use("/login", require("./login"));

router.use(function (req, res, next) {
  if (!req.session.UserId) {
    res.redirect(`/login?error=${"Harus login dulu"}`);
  } else {
    next();
  }
});

router.get("/", (req, res) => res.redirect("/products"));

router.use("/products", require("./products"));
router.use("/users", require("./users"));

router.get("/logout");

module.exports = router;
