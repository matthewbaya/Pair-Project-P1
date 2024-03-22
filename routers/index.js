const express = require("express");
const Logout = require("../ctrls/logout");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

router.get("/logout", Logout.logOut);

module.exports = router;
