//express.js which nothing by a modern javascript library to create node ja servers

//GET API endpoint->fetch data from the server
//POST API endpoint -> insert data into the server
//PUT API endpoint ->update data into the server

let users={};//a database

//add a database layer to the apis (MongoDB) -create an account on MongoDB Atlas- https://www.mongodb.com/cloud/atlas/register
//setup postman and test the PIs we discussed today -https://www.postman.com/downloads/

//try and play around with the APIs discussed today.
//complex API functions in Node JS
//Controller Service Architecture in Node JS

//Introduction to React

//incoming json:{id:1,name:'Sreeja',age:24}
//users={
//1:{name:'sreeja',age:24 }
//}

//my user object will have id, name and age attributes{ id:1, name:'sreeja', age:24}


const express = require('express');//npm install express

const app=express();

//middleware
app.use(express.json());

const port = 4001
//This means, request is nothing but an object which looks like this:
//request = {header:'',body:json of the data we want to be inserted } json={id:1,name:'sreeja',age:24}


//POST create a new user
app.post('/users', (req, res) => {
//this function will get triggered with the user calls 127.0.01:4000/users(request header)

//every request has a header, and a body. the body of the request is basically the json object coming to it in the request.
//object destructuring
 const { id, name, age}=req.body;

 users[id] = {name, age}

 res.status(201).json({
    sucess:true,
    data:users
 })
})


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

//discuss about response status


//get HTTP call to my server which sends my name and age as response
app.get('/data', (req, res)=>{
    //this function will trigger the moment this api is hit

    //add any logic over hereto send data from my server
    /*res.send({
        name: 'sreeja',
        age:22
    })*/
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


//listen on port 8080 and start my server
app.listen(port, () =>{
    console.log("My server has started on the port " +port)
})

//request is nnothing but an object of params, headers, body, authorisation ...
//response is nothing but an object of status code, body ...
//status code - industry adopted codes for expaining the response of an API
//200 - OK
//201 - Created Successfullly
//500 - Internal Server error
//404 - Not found
//401 - Unauthorized
