import { body, ValidationChain } from "express-validator";
import UserModel from "../../models/User.model";

const UserLoginValidador: ValidationChain[] = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),
];

export default UserLoginValidador;