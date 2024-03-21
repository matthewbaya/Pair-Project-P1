const express = require("express");
const session = require("express-session");
const router = require("./routers/index");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
