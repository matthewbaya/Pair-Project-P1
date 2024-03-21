"use strict";
const { Product, User, Category } = require("../models");

class ProductCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showProducts(req, res) {
    try {
      let products = await Product.findAll({ include: Category });
      res.render("landing-admin", { products });
      // res.send(products);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Add Product ─────────────────────────────────────────────────────
  static async addProducts(req, res) {
    try {
      let products = await Product.findAll();
      let category = await Category.findAll();
      // res.send(category)
      res.render("add-product", { products, category });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Save Product ────────────────────────────────────────────────────
  static async saveProduct(req, res) {
    try {
      let { name, price, description, CategoryId } = req.body;
      // res.send({name, price, description, CategoryId})
      await Product.create({ name, price, description, CategoryId });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
  //* ─── Delete Product ────────────────────────────────────────────────────
  static async deleteProduct(req, res) {
    try {
      let { productId } = req.params;
      // await Product.findByPk(productId);
      await Product.destroy({
        where: { id: productId },
      });
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  //* ─── Edit Product ─────────────────────────────────────────────────────
  static async editProducts(req, res) {
    try {
      let { productId } = req.params;
      let product = await Product.findByPk(productId, { include: Category });
      let category = await Category.findAll();
      // res.send(productId)
      res.render("edit-product", { product, category });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postEditProducts(req, res) {
    try {
      let { productId } = req.params;
      let { name, price, description, CategoryId } = req.body;
      // res.send({name, price, description, CategoryId})
      await Product.update(
        { name, price, description, CategoryId },
        {
          where: {
            id: productId,
          },
        }
      );
      res.redirect("/");
    } catch (error) {
      res.send(error);
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
