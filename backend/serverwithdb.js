//replace the users object with a MongoDB Database
//Break down this project in Models, COntrollers, Routes Structure

//let users={};//a database


const express = require('express');//npm install express
//import monogoose package- has functions required to perform operations in mongobd starting all the way connecting to the cluster
const mongoose = require('mongoose');//npm install mongoose

const app=express();

//middleware
app.use(express.json());

const port = 4002

const mongoUrl = "mongodb+srv://jogusreeja2002:27Fh51PySSh1tZKA@cluster0.ahcqzzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//Connect to MongoDB
mongoose.connect(mongoUrl, {});

//Event Listeners for MongoDB connection
mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDB successfully");
})

const userRoutes = require('./routes/userRoute')

app.use('/api', userRoutes)
/*1
//POST create a new user
app.post('/users', (req, res) => {
//this function will get triggered with the user calls 127.0.01:4000/users(request header)

 const { id, name, age}=req.body;

 users[id] = {name, age}

 res.status(201).json({
    sucess:true,
    data:users
 })
})
*/
/*3
//PUT edit an existing user from the user id
app.put('/update/:id', (req, res) => {
    //this function will get triggered when the user calls 127.0.0.1:4000/update/2 {name: "Dolly", age:21}
    const { id } =req.params
    const{ name, age} = req.body

    users[id] = {name, age}
    res.status(200).json({
        sucess:true,
        data: users
    })
})
*/
//discuss about response status

/*2
//get HTTP call to my server which sends my name and age as response
app.get('/data', (req, res)=>{
    //this function will trigger the moment this api is hit

    //add any logic over hereto send data from my server
    /*res.send({
        name: 'sreeja',
        age:22
    })
   try{
    //add any logic over hereto send data from my server
    res.status(200).json({
        success: true,
        data: users
    })
}catch(err){
    res.status(500).json({
        success: false
    })
}
})
*/

//listen on port 8080 and start my server
app.listen(port, () =>{
    console.log("My server has started on the port " +port)
})
