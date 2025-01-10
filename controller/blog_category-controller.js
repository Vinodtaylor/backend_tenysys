const blogCategoryService = require("../service/blog_category-service");


exports.create = (req,res,next) => {

    blogCategoryService.createBlogCategory(req.body,(error,results)=>{

        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results,
            });
        }

    })

}

exports.findAll = (req,res,next)=>{

    var conditionParams = {};

    blogCategoryService.getBlogCategory(conditionParams,(error,results)=>{
        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results,
            });
        }
    });
};

exports.findOne = (req,res,next)=>{
    var conditionParams = {
        blogCategoryId : req.params.id
    };
    blogCategoryService.getBlogCategoryById(conditionParams,(error,results)=>{
        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        }
    });
};

exports.update = (req,res,next)=>{
    blogCategory = req.body;
    blogCategory.id = req.params.id;

    blogCategoryService.updateBlogCategory(blogCategory,(error,results)=>{
        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        }
    });
};

exports.delete = (req,res,next)=>{
    var conditionParams = {
        blogCategoryId : req.params.id
    };

    blogCategoryService.deleteBlogCategory(conditionParams,(error,results)=>{
        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        }
    });
};

exports.findBlogCategorywithpagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const offset = (page - 1) * limit;

    const conditionParams = {
        offset: offset,
        limit: limit,
        search : search
    };

    blogCategoryService.getBlogCategorywithPagination(conditionParams, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};