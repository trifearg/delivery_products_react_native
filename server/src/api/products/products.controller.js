import {ProductDAO} from "../../dao/productDAO";

const errorHandler = require("../../utils/errorHandler");

export default class ProductsController {
  // register product
  static async createProduct(req, res) {
    try {
      let product = await ProductDAO.createProduct(req);
      res.status(201).json(product);
    } catch (e) {
      errorHandler(res, e)
    }
  }
  // get all products
  static async getProducts(req, res) {
    try {
      let products = await ProductDAO.getProducts(req);
      res.status(200).json(products);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // get product by ID
  static async getProductById(req, res) {
    try {
      let product = await ProductDAO.getProductById(req);
      res.status(200).json(product);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // get products by CATEGORY
  static async getProductsByCategory(req, res) {
    try {
      let product = await ProductDAO.getProductsByCategory(req);
      res.status(200).json(product);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // update product
  static async updateProduct(req, res) {
    try {
      let response = await ProductDAO.updateProduct(req);
      res.status(200).json(response);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // delete product by ID
  static async deleteProductById(req, res) {
    try {
      let response = await ProductDAO.deleteProductById(req);
      res.status(200).json(response);
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
