const User = require('../models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
async function registerUser(req,res){
    let {firstName,lastName,username,password}= req.body;
    try{
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length > 0){
            return res.status(400).send({message:"User already regsiterd"});

    }
    
    let user = new User({firstName,lastName,username,password});
    const result = await user.save(); 
    console.log(result)
    res.status(201).send({mesaage:'User is registerd'});

   }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" })

    }
}

async function loginUser(req,res){
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).send({error:"User is not there"})
        }
        const isPaswworsdValid = await user.comparePassword(password);
        if(!isPaswworsdValid){
            return res.status(404).send({error:"Wrong password!"})
        }
        let token = await jwt.sign({userId:user?._id},secretKey,{expiresIn:'1h'});
        let finalData = { 
            userId: user?._id,
            username:user?.username,
            firstName:user?.lastName,
            lastName:user?.lastName,
            token 
        }
        res.send(finalData);


    }catch(err){
        console.log(err);
        res.status(400).send(err);

    }

}
    

    
       


const AuthController = { 
    registerUser,
    loginUser
}
module.exports = AuthController;