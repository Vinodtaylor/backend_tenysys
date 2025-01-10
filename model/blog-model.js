const mongoose = require ("mongoose");
const { Schema } = mongoose;
const convertUtcToIst = require('../timestamps/timestamps_convert');

const blogSchema = new Schema({

    blog_title : {
        type : String,
        required : true,
    },
    blog_image : {
        type : String
    },
    blog_category : {
        type : mongoose.Schema.ObjectId,
        ref : "blog_category_mst"
    },
    blog_description : {
        type : String,
    },
    blogs_faq : [
        {
            blog_faq_question : {
                type : String,
            },
            blog_faq_answer : {
                type : String
            },
        },
    ],
    faq : [
        {
            faq_question : {
                type : String,
            },
            faq_answer : {
                type : String,
            },
        },
    ],
    meta_name : {
        type : String,
    },
    meta_tag : [
        {
            type : String,
        },
    ],
    meta_description : {
       type :String
    },
    slug: {
        type: String,
        default: "",
    },
    
},
    {
        timestamps : {
            currentTime: () => convertUtcToIst(new Date())
        },
    });

blogSchema.set(
    "toJSON",
    {
        transform : (document,returnedObject)=>{
            delete returnedObject.__v;
        },
    }
);

function generateSlug(blog_title) {
    return blog_title
        .replace(/<\/?[^>]+(>|$)/g, "") 
        .toLowerCase()
        .replace(/\s+/g, "-")          
        .replace(/[^\w\-]+/g, ""); 
  }

  blogSchema.pre("save", function (next) {
    if (this.isModified("blog_title")) {
      this.slug = generateSlug(this.blog_title);
    }
    next();
  });

const BlogModel = mongoose.model(
    "blog_mst",
    blogSchema,
    "blog_mst"
);

module.exports = BlogModel;