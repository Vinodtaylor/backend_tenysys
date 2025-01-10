const mongoose = require ("mongoose");
const { Schema } = mongoose;
const convertUtcToIst = require('../timestamps/timestamps_convert');

const blogCategorySchema = new Schema({

    blog_category : {
        type : String,
    },
    
},
    {
        timestamps : {
            currentTime: () => convertUtcToIst(new Date())
        },
    });

blogCategorySchema.set(
    "toJSON",
    {
        transform : (document,returnedObject)=>{
            delete returnedObject.__v;
        },
    }
);

const BlogCategoryModel = mongoose.model(
    "blog_category_mst",
    blogCategorySchema,
    "blog_category_mst"
);

module.exports = BlogCategoryModel;