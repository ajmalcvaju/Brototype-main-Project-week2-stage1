// var express = require('express');
// const user_route=express()
// const userController=require("../controllers/userController")
// user_route.get("/register",userController.loadRegister)
// module.exports=user_route;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const userauth = require("../controllers/userauth");
const middleware = require("../middlewares/middlewares");

router.get("/", async (req, res) => {
  if (req.session && req.session.email) {
    res.render("user/home", { login: 1 });
  } else {
    res.render("user/home", { login: 0 });
  }
});
router.get("/login", middleware.checkSession, async (req, res) => {
  res.render("user/login");
});
router.post("/login", userauth.login);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.get("/signup", middleware.checkSession2, userController.loadRegister);
router.post("/signup", upload.single("image"), userController.insertUser);
router.post("/signup/verify", userController.verifyMail);

router.get("/reset", userController.reset);
router.post("/reset", userController.resetPass);
router.post("/reset/verify", userController.changePassword);
router.post("/reset/new-password", userController.updatePassword);

router.get("/shop", async (req, res) => {
  if (req.session && req.session.email) {
    const products = await Product.find({});
    const categories = await Category.find({});
    res.render("user/shop-sidebar", { products, categories, login: 1 });
  } else {
    const products = await Product.find({});
    const categories = await Category.find({});
    res.render("user/shop-sidebar", { products, categories, login: 0 });
  }
});
router.get("/home", async (req, res) => {
  res.render("user/home");
});
router.get("/product-details", async (req, res) => {
  if (req.session && req.session.email) {
    const Products = await Product.find({ _id: req.query.id });
    const product = Products[0];
    res.render("user/product-details", { product, login: 1 });
  } else {
    const Products = await Product.find({ _id: req.query.id });
    const product = Products[0];
    res.render("user/product-details", { product, login: 0 });
  }
});
module.exports = router;