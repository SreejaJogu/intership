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
    try{
        //for pagination I need page number and limit 
        const { page, limit } = req.query
        //tranform my operation to show me only  the entries on a specfic page with its limit

        //the logic to get all the data present inside the collection users
        //within my operation I need to write a condition which returns only the users for whom isDelete: false
        const users = await User.find({isDeleted: false}).limit(limit).skip((page-1) * limit).exec(); 
    
        res.status(200).json({
          success: true,
          data: users
        })
    } catch(err){
      res.status(500).json({
        success:false,
        message: err.message
      })
    }
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

// This function is responsible for soft deleting a user from mongodb
exports.softDeleteById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        user.isDeleted = true;
        user.save();

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


//This function is responsible for uploading aa file from local machine to the server
exports.uploadFile = async(req, res)=> {
    try{
        res.status(201).json({ // uploading a file is quivalent to creating a new data inside the server instance
            success:true,
            data: req.file,
            message: 'File uploaded successfully'
        })
    }catch (err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.uploadMultipleFiles = async (req, res) => {
    try {
        if (req.files.length === 0) {
            res.status(400).json({
                success: false,
                message: 'No files were uploaded'
            })
        }

        res.status(201).json({  // uploading a file is quivalent to creating a new data inside the server instance
            success: true,
            data: req.file,
            message: 'File uploaded successfully'
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}