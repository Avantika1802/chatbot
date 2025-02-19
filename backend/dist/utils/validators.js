import { body, validationResult } from "express-validator";
//customised validator function
//array of validation chains that we had defined below
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("invalid email"),
    body("password").trim().isLength({ min: 6 }).withMessage("invalid password, should contain atleast 6 characters"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    //use email validator and password validator from loginValidator
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map