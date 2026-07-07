const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        const userExist = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (userExist) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });


        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            },
            
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(201).json({
            
            message: "User registered successfully",
            
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
            
        });

    } catch (err) {
        console.error("Register Error:", err);

        return res.status(500).json({
            message: err.message
        });
    }
}

async function logingUser(req,res) {
        const { username, email, password, role = "user" } = req.body;

        const user = await userModel.findOne({
            $or:[{username},
                {email}
            ]
        });

        if(!user){
            return res.status(401).json({
                massage:"Invalid credential"
            });
        }

         const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            },
            
        );
    

        res.cookie("token",token,{
            httpOnly:true
        });

        return res.status(200).json({
            massage:"User login Succesfulliy",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        
        })



    
}

async function logOutUser(req, res) {
    try{ 
        res.clearCookie("token");

    return res.status(200).json({
        message: "User Logout Successfully"
    });
   }catch(err){
    console.error(massage.error)
   }
   
}
module.exports = {
    registerUser,
    logingUser,
    logOutUser

};