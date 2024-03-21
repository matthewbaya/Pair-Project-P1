const { UserDetail } = require("../models");
const bcrypt = require("bcryptjs");

class Login {
  static async login(req, res) {
    const { error } = req.query;
    try {
      res.render("login-page", { error });
    } catch (error) {
      console.error(error);
      res.send(error.message);
    }
  }

  static async saveLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserDetail.findOne({ where: { email } });

      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (isValidPassword) {
          req.session.UserId = user.id;
          if (user.role === "admin") {
            res.redirect(`/`);
          } else {
            res.redirect(`/customer`);
          }
        } else {
          const error = `Password salah.`;
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = `Username tidak ada.`;
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      console.error(error);
      res.send(error.message);
    }
  }
}

module.exports = Login;
