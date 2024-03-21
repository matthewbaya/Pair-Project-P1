const { UserDetail } = require("../models");
const bcrypt = require("bcryptjs");

class Login {
  static async login(req, res) {
    const { error } = req.query;
    try {
      res.render("login-page", { error });
    } catch (error) {
      console.log(error);
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
          // case berhasil login
          req.session.userId = user.id; // ini artinya ngasih jejak kalau user ini sedang login, set di controller
          //   console.log(req.session)

          res.redirect(`/`);
        } else {
          const error = `Password salah.`;
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = `Username tidak ada.`;
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Login;
