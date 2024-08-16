const Joi = require('joi');//npm install joi
// schema variable is basically the set of rules on which validation shall be applied. schema will be an object of joi class with the function validate() attached to it

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }else{
        next();
    }
}
module.exports = { validate };