const express = require("express");
const router  = express.Router();

const BlogCategoryController = require("../controller/blog_category-controller");
const BlogController = require("../controller/blog-controller");


// Blog 

router.post("/blog/create_blog", BlogController.create);
router.get("/blog/get_blog",BlogController.findAll);
router.get("/blog/recentblog",BlogController.recentBlog);
router.get("/blog/get_blog/:id",BlogController.findOne);
router.put("/blog/update_blog/:id", BlogController.update);
router.delete("/blog/delete_blog/:id", BlogController.delete);
router.get("/blog/get_blogone/:slug",BlogController.findOneBlog);
router.get("/getallblogs",BlogController.findAllBlog);

// Blog Category

router.post("/blogcategory/add_blogcategory", BlogCategoryController.create);
router.get("/blogcategory/get_blogcategory", BlogCategoryController.findAll);
router.get("/blogcategory/get_blogcategory/:id", BlogCategoryController.findOne);
router.put("/blogcategory/update_blogcategory/:id", BlogCategoryController.update);
router.delete("/blogcategory/delete_blogcategory/:id", BlogCategoryController.delete);
router.get("/getblogcategorywithpagination",BlogCategoryController.findBlogCategorywithpagination);

module.exports = router;