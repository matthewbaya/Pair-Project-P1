"use strict";

const { UserDetail } = require("../models");

class Register {
  //* ─── Register ────────────────────────────────────────────────────────
  static async register(req, res) {
    const { error } = req.query;
    try {
      res.render("register-page", { error });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async saveRegister(req, res) {
    let { email, password } = req.body;
    await UserDetail.create({ email, password });
    res.redirect("/login");
    try {
    } catch (error) {
      console.log(error);

      if (error.name == "SequelizeValidationError") {
        let errormsg = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/register?error=${errormsg}`);
      } else {
        res.send(error.message);
      }
    }
  }
}

module.exports = Register;
