// Libray Management System: Role: Admin, Student, Teacher (Backend)

// 1. Ability to login/signup
// 2. The Admin shall be able to see all the students who in the Library
// 3. The Admin shall be able to see all the book inside the Library
// 4. The student can issue a book from the library if it is available. Student needs to return book in 1 week
// 5. The admin shall see what all books have been issued and their due dates.
// 6. If the admin finds that a student has kept the book more than due date, the admin shall be able to send an email reminder to the student
// 6. New books will be added by the Admin


// 7. If the admin finds that a student has kept the book more than due date, the admin shall be able to send an email reminder to the student
// 8. The student can return a book
// 9. Student can request a book
// 10. Autocomplete from the list of books


// Technical Planning
// [X] API are present for login/signup (creatUser) which can create a student or admin
// [X] Create an API that can only be authorise by the Admin, which returns a list of students
// [X] Create a model for book. Then, write an API which fetches the list of all the books. I will not authorise this API, since both students and admin can view list of books. But this API needs to be authenticated, since I dont want anybody to call this API who is not a user of my library.
// [X] Inside the Book document, we need to have a relationship between book and student id which basically tells us that the book has been issued to a student.
// [X] Return the book details, along with the student details who has issued the book. This API can be accessed only by Admin.
// [X] Write an API to create a book. This API can be accessed only by Admin. Since only admin can introduce new books in the library.


// Explanation of point 10: books : ['White Tiger', 'White Lion', 'Eye of the Lion']. Search: whi -> 'white lion' & 'white tiger', lion -> 'eye of the lion', 'white lion'

// [ADVANCED]: Add fines to students when they don't return the book before due date, If student lost the book

//[X]we need to encrypt the password before storing inside the database - decrypt password using a secret key
//[X]make the apis protected - security layer 2
//[X]authorise the ApIs - data is restricted to every user - jwt token !(json web token)-security layer 3
//[X] role level authorisation
//[X]error handling / exception handling
//[X]Pagination and Filtering at an API level - 40000 posts - NO, 40, 40, 40....... reached rock bottom of the number 40,000
//[X]soft delete and hard delete 
//[X]middleware

//[X]file uploading
//[X]validations - Joi is also a middleware

//[]websockets! - chat, gaming

//fs & multer
//fs = File storeage, this package has all the functions needed to read, write and append a file

//Validation is a set of rules that we want to apply to our data such that there is some format in which the data is inserted
//create an API which takes a document and just stored it inside my server

//5,000,000 users = 0.2=1,000,000kb = 1000mb =1gb
//3,000,000,000 users = 3,000,000 = 0.2 =6,000,000,000kb=6,000,000mb=6000gb 
//100 users = 100=0.2=2kb->20kb->20kb->
//5 - 1kb ~ 1 - 0.2kb

//google and understand the difference between authentication and authorization

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

//listen on port 8080 and start my server
app.listen(port, () =>{
    console.log("My server has started on the port " +port)
})
