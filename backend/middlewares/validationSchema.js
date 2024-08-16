const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {
    createUserSchema,
    loginSchema
}