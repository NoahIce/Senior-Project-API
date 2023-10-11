//Noah Ice
//CST-452 Milestone
//Tasks are used to stored the information of the tasks on each board
import { Router } from "express";
import * as tasksController from "./tasks.controller";

const router = Router();

//Routes
router.route("/tasks").get(tasksController.readTasks); //Get all
router.route("/tasks/readTaskById").get(tasksController.readTaskById); //Get one
router.route("/tasks/getMatchingGoogleTasks").get(tasksController.getMatchingGoogleTasks); //Get matching google_id's
router.route("/tasks/createTask").post(tasksController.createTask); //Create
router.route("/tasks/updateTask").put(tasksController.updateTask); //Update
router.route("/tasks/deleteTask/:task_id").delete(tasksController.deleteTask); //Delete

export default router