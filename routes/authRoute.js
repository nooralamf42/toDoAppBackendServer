import { Router } from "express";
import {createAccount, checkLogin} from "../controller/authController.js"
export const authRouter = Router()

authRouter
          .post("/signup", createAccount)
          .post("/login", checkLogin)