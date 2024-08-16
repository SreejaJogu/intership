const multer = require('multer');

//set up storage enginer, this is basically giving the location where my file would be stored inside my server its name
const storage = multer.diskStorage({    // disk storage means I will be storing inside the memory location of my server instance
    destination: './uploads/',
    filename: (req, file, next) => {
        next(null, `${Date.now()}-${file.originalname}`)
    }
})

// Initialise upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB is the maximum size of acceptable files
    fileFilter: (req, file, next) => {
        // check the type of file
        checkFileType(file, next)
    }
}) 

// Check the type for the file 
function checkFileType(file, next)  {
    // these are the allowed file extensions
    const filetypes = /jpeg|jpg|pdf|png|gif|/;

    return next(null, true)
}

module.exports = { upload }