import express from "express";
import { UserController } from "../controllers/user.controller";

const authRouter = express.Router();

authRouter.post("/register", UserController.register);
authRouter.get("/all", UserController.allUsers);

export default authRouter;