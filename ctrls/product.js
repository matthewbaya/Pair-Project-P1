"use strict";
const { Op } = require('sequelize');

const { Product, User, Category } = require("../models");
const product = require("../models/product");
const { query } = require('express');

class ProductCtrl {
  //* ─── Main Page ───────────────────────────────────────────────────────
  static async showProducts(req, res) {
    try {
      let {searchProduct, searchCategory} = req.query;
      let options = {
        include: {model: Category,
        where: {}
      },
        order: [['CategoryId', 'ASC']],
        where: {}
      }
      if (searchProduct){
        options.where.name =  {
          [Op.iLike]: `%${searchProduct}%`
      }
      }
      if (searchCategory){
        options.include.where.name =  {
          [Op.iLike]: `%${searchCategory}%`
      }
      }

      let products = await Product.findAll(options);
      // res.send(products)
      res.render('landing-admin', {products});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Add Product ─────────────────────────────────────────────────────
  static async addProducts(req, res) {
    try {
      let products = await Product.findAll();
      let category = await Category.findAll()
      res.render("add-product", {products, category});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  //* ─── Save Product ────────────────────────────────────────────────────
  static async saveProduct(req, res) {
    try {
      let {name, price, description, CategoryId} = req.body
      await Product.create({name, price, description, CategoryId});
      res.redirect('/')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
//* ─── Delete Product ────────────────────────────────────────────────────
static async deleteProduct(req,res){
  try {
    let { productId } = req.params;
    await Product.destroy({
        where: { id: productId }
    });
    res.redirect('/')
  } catch (error) {
    res.send(error)
  }
}

  //* ─── Edit Product ─────────────────────────────────────────────────────
  static async editProducts(req, res) {
    try {
      let {productId} = req.params
      let product = await Product.findByPk(productId, { include: Category });
      let category = await Category.findAll()
      // res.send(productId)
      res.render("edit-product", {product, category});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postEditProducts(req, res){
    try {
      let {productId} = req.params;
      let {name, price, description, CategoryId} = req.body;
      // res.send({name, price, description, CategoryId})
      await Product.update({name, price, description, CategoryId}, 
          {where:{
          id: productId
      }});
      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }

static async customerPage(req, res){
  try {
    let {searchProduct, searchCategory} = req.query;
    let options = {
      include: {model: Category,
      where: {}
    },
      order: [['CategoryId', 'ASC']],
      where: {}
    }
    if (searchProduct){
      options.where.name =  {
        [Op.iLike]: `%${searchProduct}%`
    }
    }
    if (searchCategory){
      options.include.where.name =  {
        [Op.iLike]: `%${searchCategory}%`
    }
    }

    let products = await Product.findAll(options);
    // res.send(products)
    res.render('landing-customer', {products});
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

static async detailProducts(req,res){
  try {
    res.send(masuk)
  } catch (error) {
    res.send(error)
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
