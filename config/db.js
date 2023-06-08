import mongoose from "mongoose";
import colors from 'colors';
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://kanggarr:Capkanggar089@xyppntok.sxrqyt7.mongodb.net/");
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);
    }catch (error){
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
};

export default connectDB;