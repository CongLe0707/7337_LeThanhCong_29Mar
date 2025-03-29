let { body, validationResult } = require('express-validator');
let constants = require('./constants');
let util = require('util');

let options = {
    password: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username: {
        minLength: 6
    }
};

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }
        next();
    },
    SignUpValidator: [
        body("username")
            .isLength({ min: options.username.minLength })
            .withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password")
            .isStrongPassword({
                minLength: options.password.minLength,
                minLowercase: options.password.minLowercase,
                minUppercase: options.password.minUppercase,
                minNumbers: options.password.minNumbers,
                minSymbols: options.password.minSymbols
            })
            .withMessage(util.format(
                constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols
            )),
        body("email")
            .isEmail()
            .withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    LoginValidator: [
        body("username")
            .isLength({ min: options.username.minLength })
            .withMessage("Username hoặc password sai"),
        body("password")
            .isLength({ min: options.password.minLength })
            .withMessage("Username hoặc password sai")
    ]
};