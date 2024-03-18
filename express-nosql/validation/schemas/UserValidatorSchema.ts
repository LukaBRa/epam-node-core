import { body, ValidationChain } from "express-validator";
import UserModel from "../../models/User.model";

const UserValidator: ValidationChain[] = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email.")
        .custom(async (email) => {
            const existingUser = await UserModel.findOne({ email: email });
            
            if(existingUser)
                throw new Error("Email address already in use.");
        })
        .withMessage("Email is already in use."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),
    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")
];

export default UserValidator;