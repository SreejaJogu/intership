const jwt = require('jsonwebtoken');//npm install jsonwebtoken

const secretKey = "celzene"

//middleware happens between request and response
//next is a node js inbuilt function which triggers the API flow to move forward. When our task is complete successfully inside the middleware, we call the next function triggering the API flow to move forward.

const protect= async (req, res, next) =>{
    let token;

    //The bearer token is generally stored as :" Bearer 346778990iouhbvtuyfrdj776543dgjiiiidxcdddsgv"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretKey)
            req.user = decoded;
            next();
        }catch(error){
            res.status(401).json({
                success: false,
                message: 'Token is invalid or expired'
            })
        }
    }
    if(!token){
        res.status(401).json({
            message: 'Token is invalid or expired'

        })
    }
}

//create a middlware to authorize acess to apis based on the roles of users
const authorize = (role) => {
    return(req, res, next)=>{
        if(req.user.role == role){
            next();
        }else{//this means that the user has a role which isnt allowed to access that api
            return res.status(403).json({
                message: 'This user is not authorised to call this specific API'
            })
        }
    }
}



module.exports = { protect, authorize}

//what is error handling?
//Error handling is basicallly trying to catch an error inside our application gracefully without closing the server