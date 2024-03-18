import express from "express";
import { UserController } from "../controllers/user.controller";
import UserValidator from "../validation/schemas/UserValidatorSchema";
import UserLoginValidador from "../validation/schemas/UserLoginValidatorSchema";

const authRouter = express.Router();

authRouter.post("/register", UserValidator, UserController.register);
authRouter.get("/all", UserController.allUsers);
authRouter.post("/login", UserLoginValidador, UserController.login);

export default authRouter;