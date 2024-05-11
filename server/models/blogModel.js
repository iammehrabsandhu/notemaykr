import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required:[true,"enter title"]
        },
       
        content: {
            type: String,
            required: true,
        },
        author:{
            type:String,
            required:true,
        },
        public:{
            type:Boolean,
            required:true
        }
    },
    {timestamps:true}
)

const blogs = mongoose.model('apitestcol',blogSchema);

export default blogs;

