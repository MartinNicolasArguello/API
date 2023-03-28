const { check, validationResult } = require("express-validator");
const register = [


    check("DNI").trim().notEmpty().withMessage("Required field").isLength({ min: 7, max: 9 }).withMessage("Invalid Length").isDecimal().withMessage("DNI must only include numbers"),
    check("lastName").trim().notEmpty().withMessage("Required field").isAlpha("en-US", { ignore: " " }).matches("^[A-Z][a-z]").withMessage("Incorrect spelling"),
    check("email").trim().notEmpty().withMessage("Required field").isEmail().withMessage("Invalid email adress").normalizeEmail(),
    check("password").trim().notEmpty().withMessage("Required Field").isLength({ min: 8, max: 15 }).withMessage("Password must contain between 8 and 15 characters").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage("Password must include at leas una uppercase, one lowercase, one number and one special character"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        return next();
    },
];

const passwordRecover = [
    check("newPasswordOne").trim().notEmpty().withMessage("Required Field").isLength({ min: 8, max: 15 }).withMessage("Password must contain between 8 and 15 characters").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage("Password must include at leas una uppercase, one lowercase, one number and one special character"),
    check("newPasswordTwo").custom(async (newPasswordTwo, { req }) => {
        if (req.body.newPasswordOne !== newPasswordTwo) {
            throw new Error("Passwords do not match")
        };
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }
        else {
            return next();
        }
    }
]

module.exports = { register, passwordRecover };