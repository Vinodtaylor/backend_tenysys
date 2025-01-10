const BlogModel = require("../model/blog-model");

async function createBlog(params,callback){

    const blogModel = new BlogModel(params);

    blogModel.save()
    .then((response)=>{
        return callback (null,response);
    }).catch((error)=>{
        return callback(error);
    });
};


async function getBlog(params, callback) {
    const { offset, limit, search } = params;
    const condition = search ? { blog_title : { $regex: search, $options: 'i' } } : {};
  
    try {
  
        const totalResults = await BlogModel.countDocuments(condition);
  
  
        const blogs = await BlogModel.find(condition)
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

async function getRecentBlog(params,callback){

    var condition = {};

    BlogModel.find(condition)
    .populate('blog_category')
    .sort({ createdAt : -1})
    .limit(3)
    .then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
};


async function getAllBlog(params,callback){

    var condition = {};

    BlogModel.find(condition)
    .populate('blog_category')
    .then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
};

async function getBlogById(params,callback){

    var blogId = params.blogId
    var condition = {};

    BlogModel.findById(blogId,condition)
    .populate('blog_category')
    .then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
};


async function updateBlog(params,callback){

    var conditionParams = {
        blogId : params.id
    }
    getBlogById(conditionParams,(error,result)=>{
        if(error){
            return callback(error);
        }else{
            const blog = { ...params };
            delete blog._id;

            BlogModel.findByIdAndUpdate(conditionParams.blogId,blog,{
                useFindAndModify : false,
                new : true,
            })
            .then((response)=>{
                if(!response){
                    callback (`Cannont Update with The Id ${conditionParams.blogId}`);
                }else{
                    callback (null,response);
                }
            }).catch((error)=>{
                return callback (error);
            });
        }
    });
};

async function deleteBlog(params,callback){

    const blogId = params.blogId;

    BlogModel.findByIdAndDelete(blogId)
    .then((response)=>{
        if(!response){
            callback (`Cannont Delete with The Id ${blogId}`);
        }else{
            callback (null,response);
        }
    }).catch((error)=>{
        return callback(error);
    });
};

async function getOneBlog(params, callback) {
    const slug = params.slug;
  
    const condition = { slug: slug };
  
    BlogModel.findOne(condition)
         .populate('blog_category')
      .then((response) => {
        return callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
  }
  
  async function addSlugsToBlog() {
    const blogs = await BlogModel.find();
  
    for (const blog of blogs) {
        blog.slug = blog.blog_title.toLowerCase().replace(/\s+/g, "-");
  
      await blog.save();
    }
  
    console.log("Slugs added to all blog");
    mongoose.connection.close();
  }

// addSlugsToBlog();

module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    getRecentBlog,
    getOneBlog,
    getAllBlog
}
