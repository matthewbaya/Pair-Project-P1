"use strict";
const { Product, User } = require("../models");

class ProductCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showProducts(req, res) {
    try {
      let products = await Product.findAll();
      // res.render('main', {products})
      res.send(products);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Add Product ─────────────────────────────────────────────────────
  static async addProducts(req, res) {
    try {
      res.render("");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Save Product ────────────────────────────────────────────────────
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
