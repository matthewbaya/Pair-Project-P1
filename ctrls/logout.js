"use strict";
class Logout {
  static async logOut(req, res) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Logout;
