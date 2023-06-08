import userModel from "../models/userModel.js";
import { comparePassword, hashPassword} from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,confirmpassword} = req.body;
        //validations
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!email){
            return res.send({message:'Email is Required'});
        }
        if(!password){
            return res.send({message:'Password is Required'});
        }
        if(!confirmpassword){
            return res.send({message: 'Confirm Password isrequired'});
        }
        if(password !== confirmpassword){
            return res.send({message: 'Password does not match'});
        }
        //check user
        const exisitingUser = await userModel.findOne({email});
        //exisiting user
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:"Already Register please login"
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            confirmpassword: hashPassword,
        }).save();

        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error,
        });
    }
};

//post login
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //valiadtion
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password',
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registerd',
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                contact: user.contact,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    try{
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
};

//update profile
export const updateProfileController = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if(password && password.length < 6){
            return res.json({error: 'Password is required and 6 character long'})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
            name: name || user.name,
            password: hashedPassword || user.password,
            },
            {new:true})
        res.status(200).send({
            success:true,
            message:'Profile Updated Successfully',
            updatedUser,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while update profile',
            error
        });
    }
};