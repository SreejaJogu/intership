//this file will basically have all the functions with logic specfic to users

const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const secretKey = "celzene"

//generate a token
const generateToken = (id, role)=>{
    return jwt.sign({ id: id, role: role }, secretKey, {
        expiresIn: '24h'
    })
}

//Creating a new user with a given name and email
exports.createUser = async(req, res) =>{
    try{
        const { name, email, role, password } = req.body;

    //user is a mongodb document
    const user = new User({
        name: name,
        email: email,
        role: role,
        password: password
    });

    //save this user inside mongodb.we are inserting the usser mongodb document inside User mongoDb collectin

    await user.save();

    //generate the token for this user who has just been registered on the library management system
    const token = generateToken(user._id, user.role)

    res.status(201).json({
        success:true,
        token: token,
        data: user
    })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.loginUser = async (req, res)=>{
    const {email, password } = req.body;
    try{
        //mongoDb operation to find the user
        const user = await User.findOne({email: email})
        //console.log("password", password)
        if(user && (await user.matchPassword(password))) {
            const token = generateToken(user._id, user.role);
            res.json({
                success:true,
                token: token,
                data: user
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
//this function gets me all the users present inside the MongoDB collection Users
exports.getAllUsers = async(req, res)=>{
    //the logic to get all the data present inside the collection users
    const users = await User.find({});
    
    res.status(200).json({
        success: true,
        data: users
    })
}

//this function updates a user by its id
exports.updateUserById = async(req, res)=>{
    //find a user by its id and uopdate it
    const{ id } = req.params 
    const { name, email } = req.body

    //error handling
    try{//we write alll the usual logic of our code here, assuming everything works fine

    //this is the operation to find and update the user
    const user = await User.findByIdAndUpdate(id, { name: name, email: email})

    res.status(200).json({
        success: true,
        data: user
    })
}catch(err){
    res.status(500).json({
        success: false,
        message: 'error occured'
    })
}
}