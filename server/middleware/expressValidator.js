const { body, validationResult } = require('express-validator');

const validateForm = [
    body('firstName').notEmpty().isAlpha() .withMessage('First name is required and should contain alphabets only.'),
    body('lastName').notEmpty().isAlpha().withMessage('Last name is required and should contain alphabets only.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('gender').notEmpty().isIn(['male', 'female', 'other']).withMessage('Gender is required and must be one of the specified options.'),
    
    body('dateOfBirth').isDate().custom((value) => {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 14) {
                throw new Error('You must be at least 14 years old.');
            }
            return true;
        }).withMessage('Invalid date of birth or you must be at least 14 years old.'),(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateForm };
