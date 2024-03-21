"use strict";

const { UserDetail, User } = require("../models");

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
    let { name, address, dateOfBirth, email, password, role } = req.body;
    try {
      let user = await UserDetail.create({
        email,
        password,
        role,
        UserId: req.session.UserId,
      });
      await User.create({name, address, dateOfBirth, UserId: user.id})
      res.redirect("/login");
      // res.send(data);
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
