import { body, ValidationChain } from "express-validator";

export const CartProductValidatorSchema: ValidationChain[] = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required."),
    body("count")
        .notEmpty()
        .withMessage("Product count is required.")
        .isNumeric()
        .withMessage("Count must me a number."),
]