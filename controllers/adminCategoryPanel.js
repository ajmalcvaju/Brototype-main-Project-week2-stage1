const Category = require("../model/categoryModel");

const adminCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("admin/category", { categories });
  } catch {
    console.log(error.message);
  }
};
const addCategory = async (req, res) => {
  try {
    res.render("admin/addCategory");
  } catch {
    console.log(error.message);
  }
};
const updateCategory = async (req, res) => {
  try {
    const cname = req.body.cname;
    const category1 = await Category.find({ cname });
    if (category1[0]) {
      res.render("admin/addCategory", { exist: true });
    } else {
      console.log(req.body);
      console.log(req.file);
      const category = new Category({
        cname: req.body.cname,
        Type: req.body.Type,
        image: req.file.filename,
      });
      const categoryData = await category.save();
      if (categoryData) {
        const categories = await Category.find({});
        res.render("admin/category", { categories });
      } else {
        res.redirect("admin/addProduct");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
const deleteCategory = async (req, res) => {
  let proId = req.query.id;
  const updatedInfo = await Category.updateOne(
    { _id: proId },
    { $set: { is_deleted: 1 } }
  );
  res.redirect("/admin/category");
};
const restoreCategory = async (req, res) => {
  let proId = req.query.id;
  const updatedInfo = await Category.updateOne(
    { _id: proId },
    { $set: { is_deleted: 0 } }
  );
  res.redirect("/admin/category");
};
const editCategory = async (req, res) => {
  let proId = req.query.id;
  const category = await Category.findOne({ _id: proId });
  res.render("admin/editCategory", { category });
};
const updatingCategory = async (req, res) => {
  const proId = req.query.id;
  console.log(req.query);
  const { cname, Type } = req.body;

  await Category.updateOne({ _id: proId }, { $set: { cname, Type } });
  res.redirect("/admin/category");
};

module.exports = {
  adminCategory,
  updateCategory,
  addCategory,
  deleteCategory,
  restoreCategory,
  editCategory,
  updatingCategory,
};
