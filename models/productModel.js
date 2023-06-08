import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        slug:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        category:{
            type:mongoose.ObjectId,
            ref:'Category'
        },
        quantity:{
            type:Number,
            required:true
        },
        photo:{
            data:Buffer,
            contentType:String,
        },
    }, 
    { timestamps:true }
);

export default mongoose.model('Products', productSchema);