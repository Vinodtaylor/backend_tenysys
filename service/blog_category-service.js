const BlogCategoryModel = require("../model/blog_category-mode");

async function createBlogCategory(params,callback){

    const blogCategoryModel = new BlogCategoryModel(params);

    blogCategoryModel.save()
    .then((response)=>{
        return callback (null,response);
    }).catch((error)=>{
        return callback(error);
    });
};

async function getBlogCategory(params,callback){

    var condition = {};

    BlogCategoryModel.find(condition)
    .sort({ _id: -1 })
    .then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
};

async function getBlogCategoryById(params,callback){

    const blogCategoryId = params.blogCategoryId;
    var condition = {};

    BlogCategoryModel.findById(blogCategoryId,condition)
    .then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
};

async function updateBlogCategory(params,callback){

    var conditionParams = {
        blogCategoryId : params.id
    }
    getBlogCategoryById(conditionParams,(error,result)=>{
        if(error){
            return callback(error);
        }else{
            const blogCategory = { ...params };
            delete blogCategory._id;

            BlogCategoryModel.findByIdAndUpdate(conditionParams.blogCategoryId,blogCategory,{
                useFindAndModify : false,
                new : true,
            })
            .then((response)=>{
                if(!response){
                    callback (`Cannont Update with The Id ${conditionParams.blogCategoryId}`);
                }else{
                    callback (null,response);
                }
            }).catch((error)=>{
                return callback (error);
            });
        }
    });
};

async function deleteBlogCategory(params,callback){

    const blogCategoryId = params.blogCategoryId;

    BlogCategoryModel.findByIdAndDelete(blogCategoryId)
    .then((response)=>{
        if(!response){
            callback (`Cannont Delete with The Id ${blogCategoryId}`);
        }else{
            callback (null,response);
        }
    }).catch((error)=>{
        return callback(error);
    });
};

async function getBlogCategorywithPagination(params, callback) {
    const { offset, limit, search } = params;
    const condition = search ? { blog_category : { $regex: search, $options: 'i' } } : {};
  
    try {
  
        const totalResults = await BlogCategoryModel.countDocuments(condition);
  
  
        const blogs = await BlogCategoryModel.find(condition)
            .skip(offset)
            .limit(limit) 
        const totalPages = Math.ceil(totalResults / limit);
  
        const currentPage = offset / limit + 1;
  
        const response = {
            data: blogs,
            pagination: {
                prev: currentPage > 1 ? currentPage - 1 : null,
                current: currentPage,
                total: totalPages,
                next: currentPage < totalPages ? currentPage + 1 : null
            }
        };
  
        return callback(null, response);
    } catch (error) {
        return callback(error);
    }
  }

module.exports = {
    createBlogCategory,
    getBlogCategory,
    getBlogCategoryById,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategorywithPagination
}