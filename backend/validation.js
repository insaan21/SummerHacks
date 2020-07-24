//validation
const Joi = require('@hapi/joi');


//Register Validation
const registerValidation = (data) => {
    //console.log(data);
    const schema = Joi.object({
        userName: Joi.string()
        .min(4)
        .required(),
    
        email: Joi.string()
        .min(6)
        .required()
        .email(),
    
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    });
    console.log(schema.validate(data));
    return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
        .min(6)
        .required()
        .email(),
    
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    });
    return schema.validate(data);
};



    module.exports.registerValidation = registerValidation;
    module.exports.loginValidation = loginValidation;