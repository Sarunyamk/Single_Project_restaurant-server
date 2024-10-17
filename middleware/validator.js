const Joi = require('joi');
const createError = require("../utils/createError");

const registerAuthen = Joi.object({

    firstname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .max(20)
        .messages({
            "string.empty": "please enter your 'Firstname'",
            "string.pattern.base": "Firstname can only contain letters (Thai or English)",
            "string.max": "Firstname must not exceed 20 characters"
        }),
    lastname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .max(20)
        .messages({
            "string.empty": "please enter your 'Lastname'",
            "string.pattern.base": "Lastname can only contain letters (Thai or English)",
            "string.max": "Lastname must not exceed 20 characters"
        }),
    phonenumber: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.empty": "Phonenumber is required"
        }),
    address: Joi.string()
        .required()
        .messages({
            "string.empty": "Address is required"
        }),

    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|`~]).{6,}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 !@#$%^&* and at least 6 characters"
        }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "string.empty": "Confirm password is required",
            "any.only": "Password does not match",
        })

})

const loginAuthen = Joi.object({


    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|`~]).{6,}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 !@#$%^&* and at least 6 characters"
        }),
})


const validateSchema = (schema) => (req, res, next) => {

    const { value, error } = schema.validate(req.body)

    if (error) {


        return createError(400, error.details[0].message)

    }

    req.input = value;
    next();
}


exports.registerAuthen = validateSchema(registerAuthen);
exports.loginAuthen = validateSchema(loginAuthen);