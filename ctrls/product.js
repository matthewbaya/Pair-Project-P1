"use strict";
const { Op } = require("sequelize");
const session = require("express-session");

const { Product, User, Category } = require("../models");
const product = require("../models/product");
const { query } = require("express");
const { formatCurrency } = require("../helpers/formater");
const { render } = require("ejs");

class ProductCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showProducts(req, res) {
    try {
      let { searchProduct, searchCategory } = req.query;
      let { name } = req.query;
      let options = {
        include: { model: Category, where: {} },
        order: [["CategoryId", "ASC"]],
        where: {},
      };
      if (searchProduct) {
        options.where.name = {
          [Op.iLike]: `%${searchProduct}%`,
        };
      }
      if (searchCategory) {
        options.include.where = { name: { [Op.iLike]: `%${searchCategory}%` } };
      }

      let products = await Product.findAll(options);
      res.render("landing-admin", { products, name, formatCurrency });
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
      res.render("add-product", { products, category });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async saveProduct(req, res) {
    try {
      let { name, price, description, CategoryId } = req.body;
      let picture = req.file.filename;
      await Product.create({ name, price, description, CategoryId, picture });
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

      let product = Product.findByPk(productId);
      await Product.destroy({ where: { id: productId } });
      res.redirect(`/products?name=${product.name}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //* ─── Edit Product ─────────────────────────────────────────────────────
  static async editProducts(req, res) {
    try {
      let { productId } = req.params;
      let product = await Product.findByPk(productId, { include: Category });
      let category = await Category.findAll();
      let picture = req.file.filename;
      res.render("edit-product", { product, category, picture });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postEditProducts(req, res) {
    try {
      let { productId } = req.params;
      let { name, price, description, CategoryId } = req.body;
      await Product.update(
        { name, price, description, CategoryId },
        { where: { id: productId } }
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async customerPage(req, res) {
    try {
      let { searchProduct, searchCategory } = req.query;
      // const user = await User.findOne({
      //   include: Profile,
      //   where: { num },
      // });
      let options = {
        include: { model: Category, where: {} },
        order: [["CategoryId", "ASC"]],
        where: {},
      };
      if (searchProduct) {
        options.where.name = {
          [Op.iLike]: `%${searchProduct}%`,
        };
      }
      if (searchCategory) {
        options.include.where = { name: { [Op.iLike]: `%${searchCategory}%` } };
      }

      let products = await Product.findAll(options);
      res.render("landing-customer", { products, formatCurrency });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async detailProducts(req, res) {
    try {
      let { productId } = req.params;
      let product = await Product.findByPk(productId);
      res.render("detail-product", { product });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async order(req, res) {
    try {
      res.send("masuk");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = ProductCtrl;
