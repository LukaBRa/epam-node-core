import express from "express";
import { UserController } from "../controllers/user.controller";
import UserValidator from "../validation/schemas/UserValidatorSchema";
import { body } from "express-validator";

const authRouter = express.Router();

authRouter.post("/register", UserValidator, UserController.register);
authRouter.get("/all", UserController.allUsers);

export default authRouter;