const blogService = require("../service/blog-service");
const { s3,upload } = require("../middleWare/multer-s3");


exports.create = (req, res, next) => {
    upload.single('blog_image')(req, res, function (err) {
      if (err) {
        return next(err);
      } else {
        if (!req.file) {
          return res.status(400).send({
            message: 'No file uploaded',
          });
        }
        const params = {
          Bucket: 'tensysinnovation',
          Key: `${req.file.originalname}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          Body: req.file.buffer,
        };
  
        s3.upload(params, (s3Error, data) => {
          if (s3Error) {
            return next(s3Error);
          } else {
            // Save the S3 URL in your database
            const s3Url = data.Location;
            const blogData = { ...req.body, blog_image: s3Url };
  
            blogService.createBlog(blogData, (error, results) => {
              if (error) {
                return next(error);
              } else {
                return res.status(200).send({
                  message: 'Success',
                  data: results,
                });
              }
            });
          }
        });
      }
    });
  };


  exports.findAll = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const offset = (page - 1) * limit;

    const conditionParams = {
        offset: offset,
        limit: limit,
        search : search
    };

    blogService.getBlog(conditionParams, (error, results) => {
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

exports.findOneBlog = (req,res,next)=>{
  
    const slug = req.params.slug;
  
    blogService.getOneBlog({ slug: slug },(error,results)=>{
        if(error){
            return next (error);
        }else{
            return res.status(200).send({
                message : "Sucess",
                data : results
            });
        }
    });
  };


  exports.findAllBlog = (req,res,next)=>{

    var conditionParams = {};

    blogService.getAllBlog(conditionParams,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        };
    });
};
  

exports.recentBlog = (req,res,next)=>{

    var conditionParams = {};

    blogService.getRecentBlog(conditionParams,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        };
    });
};

exports.findOne = (req,res,next)=>{

    var conditionParams = {
        blogId : req.params.id
    };

    blogService.getBlogById(conditionParams,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message : "Success",
                data : results
            });
        };
    });
};

exports.update = (req, res, next) => {
    upload.single('blog_image')(req, res, function (err) {
        if (err) {
            return next(err);
        } else {
            let path = req.body.blog_image;
            let blog_title = req.body.blog_title;
            let blog_description = req.body.blog_description;
            let blog_category = req.body.blog_category;
            let meta_name = req.body.meta_name;
            let meta_tag = req.body.meta_tag;
            let slug = req.body.slug;
            let blogs_faq = req.body.blogs_faq;
            let faq = req.body.faq;
            let meta_description = req.body.meta_description;

            if (req.file) {

                path = `${req.file.originalname}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`; 
                const params = {
                    Bucket: 'tensysinnovation',
                    Key: `${req.file.originalname}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, 
                    Body: req.file.buffer,
                };


                s3.upload(params, (s3Error, data) => {
                    if (s3Error) {
                        return next(s3Error);
                    } else {
                        path = data.Location;
                        updateBlogRecord(req, res, next, path);
                    }
                });
            } else {
                updateBlogRecord(req, res, next, path, blog_title, blog_description, meta_name, meta_tag, meta_description, blog_category, slug, blogs_faq, faq);
            }
        }
    });
};

function updateBlogRecord(req, res, next, newDocumentURL, blog_title, blog_description, meta_name, meta_tag, meta_description, blog_category, slug, blogs_faq, faq) {
    const blog = {
        id: req.params.id,

        blog_image: newDocumentURL,
        blog_title : blog_title,
        blog_description : blog_description,
        meta_name : meta_name,
        blog_category : blog_category,
        slug : slug,
        meta_tag : meta_tag,
        meta_description : meta_description,
        blogs_faq : blogs_faq,
        faq : faq
    };

    blogService.updateBlog(blog, (error, results) => {
        if (error) {
            logger.info(`Error from controller update blog ->  ${error}`);
            return next(error);
        } else {
            return res.status(200).send({
                message: "success",
                data: results,
            });
        }
    });
}


exports.delete = (req,res, next)=>{
    var conditionParams = {
        blogId: req.params.id,
    };
    blogService.deleteBlog(conditionParams, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "success",
                data: result,
            });
        }
    });
}