const Book = require('../models/bookModel')

// Write a function that returns all the books present inside the database
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ isDeleted: false })

        res.status(200).json({
            success: true,
            data: books
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Write a function that returns all the book details along with the student details who issued those books
exports.getIssuedBookDetails = async (req, res) => {
    try {
        // first I will find the books for whom isDelete: false
        // second I will populate the details of the user who have book.issuedBy as their id
        const books = await Book.find({ isDeleted: false }).populate({
            path: 'issuedBy',
            select: '_id name email role' // Select only the fields which we want to display in the response
        }).exec()

        res.status(200).json({
            success: true,
            data: books
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Write a function which takes book details from the request body and saves it ad a document inside the book collection
exports.createBook = async (req, res) => {
    try {
        const { title, author, image, yearOfPublication, genre, issuedBy, issuedAt } = req.body

        const book = new Book({
            title: title,
            author: author,
            image: image,
            yearOfPublication: yearOfPublication,
            genre: genre,
            issuedBy: issuedBy,
            issuedAt: issuedAt
        })

        await book.save()

        res.status(201).json({
            success: true,
            data: book
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.returnBook = async (req, res) => {
    try {
        // update the issuedAt & issuedBy to null
        const { id } = req.params

        const book = await Book.findByIdAndUpdate(
            id,
            { issuedAt: null, issuedBy: null }
        );

        if (!book)  {   // resource not found
            res.status(404).json({
                success: false,
                messsage: "No such book exists in the database"
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.issueBook = async (req, res) => {
    try {
        // update the issuedAt & issuedBy to current time & student id respectively
        const { id } = req.params
        const { studentId } = req.body

        const book = await Book.findByIdAndUpdate(
            id,
            { issuedAt: Date.now(), issuedBy: studentId }
        );

        if (!book)  {   // resource not found
            res.status(404).json({
                success: false,
                messsage: "No such book exists in the database"
            })
        }

        res.status(200).json({
            success: true,
            data: book
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// regex - format of a string
// firstname middlename lastname {regex of an indian name}
// [a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]*.[com|in|org|io|net|au] regex of an email
// [a-zA-Z]* [a-zA-Z]* [a-zA-Z]* regex of an indian name
// Fall of the giants, The Subtle art of something
// fa -> book called Fall of the giants
exports.searchBook = async (req, res) => {
    const { query } = req.params;

    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
            ],
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            data: books
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// This function is responsible for soft deleting a book from mongodb
exports.softDeleteById = async (req, res) => {
    const { id } = req.params

    try {
        const book = await Book.findById(id)

        book.isDeleted = true;
        book.save();

        res.status(200).json({
            success: true,
            data: book
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// this functions return me all the books which are issued by a given user
exports.getBooksIssuedByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const books = await Book.find({ issuedBy: userId })

        if (!books) {
            res.status(404).json({
                success: false,
                message: 'No books found'
            })
        }

        res.status(200).json({
            success: true,
            data: books
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}