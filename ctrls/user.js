"use strict";
const { Product, User } = require("../models");

class UserCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showUser(req, res) {
    try {
      let user = await Product.findOne({ where });
      res.send(user);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Add User ─────────────────────────────────────────────────────
  static async ad(req, res) {
    try {
      res.render("");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Save User ────────────────────────────────────────────────────
  static async saveProduct(req, res) {
    try {
      await Product.create({});
      res.render("");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = ProductCtrl;
