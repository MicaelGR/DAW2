const Joi = require('joi');

const loginValidationSchema = (params) => {
    const schema = Joi.object({
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(10)
                .required()        
    });

    return schema.validate(params);    
};

const registerValidationSchema = (params) => {
    const schema = Joi.object({
        name: Joi.string()
                .alphanum()
                .min(7)
                .max(30)
                .required(),
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(10)
                .required()        
    });

    return schema.validate(params);    
};

module.exports.registerValidationSchema = registerValidationSchema;
module.exports.loginValidationSchema = loginValidationSchema;