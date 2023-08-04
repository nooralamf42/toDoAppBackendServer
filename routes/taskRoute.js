import { Router } from "express";
import { createTask, checkUserTask, deleteUserTask, updateTask} from "../controller/taskController.js";

export const taskRoute = Router();

taskRoute
          .post("/create", createTask)
          .get("/get", checkUserTask)
          .put("/update", updateTask)
          .delete("/delete", deleteUserTask)