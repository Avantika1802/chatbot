import { NextFunction, Request, Response} from "express";
import {body, ValidationChain, validationResult} from "express-validator";

//customised validator function
//array of validation chains that we had defined below
const validate = (validations : ValidationChain[]) =>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }   
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors:errors.array()})
    };
};

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("invalid email"),
    body("password").trim().isLength({min : 6}).withMessage("invalid password, should contain atleast 6 characters"),
];
    
