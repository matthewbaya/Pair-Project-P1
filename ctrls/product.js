"use strict";
const { Product, User, Category } = require("../models");

class ProductCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showProducts(req, res) {
    try {
      let products = await Product.findAll({ include: Category });
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

  Order;
  static async order(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = ProductCtrl;
