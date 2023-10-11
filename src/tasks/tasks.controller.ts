//Noah Ice
//CST-452 Milestone
//Tasks are used to stored the information of the tasks on each board
import { Response, Request, RequestHandler, response } from "express";
import { Task } from "./tasks.model";
import * as TaskDAO from "./tasks.dao"
import { OkPacket } from "mysql";

//Function to read all tasks
export const readTasks: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all tasks
        let users = await TaskDAO.readTasks();
        res.status(200).json(users);
    } catch (error) {
        console.log(error + "\nError in task.controller.readTasks");
    }

}

//Function to get a tasks given an Id
export const readTaskById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get a tasks given an Id
        let user = await TaskDAO.readTaskById(parseInt(req.query.task_id as string));
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in task.controller.readTaskById");
    }
}

//Function to get tasks that are in a set of google_ids
export const getMatchingGoogleTasks: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get a tasks given an array of google_id's
        console.log(req.query.google_id)
        let user = await TaskDAO.getMatchingGoogleTasks(req.query.google_id as string);
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in tasks.controller.getMatchingGoogleTasks");
        res.status(400)
    }
}

//Function to create a new tasks from a JSON object
export const createTask: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Create new tasks
        console.log("creating task")
        console.log(req.body.user_id)
        console.log(req.body.google_id)
        console.log(req.body.title)
        const OkPacket: OkPacket = await TaskDAO.createTask(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in tasks.controller.createTask")
    }
}

//Update a task given a json object
export const updateTask: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Update task
        console.log("updating task")
        //console.log("user_id: " + req.body.user_id)
        const OkPacket: OkPacket = await TaskDAO.updateTask(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in tasks.controller.updateTask")
    }
}

//Function to delete task
export const deleteTask: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Delete task
        let user = await TaskDAO.deleteTask(parseInt(req.params.task_id as string));
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in task.controller.deleteTask")
    }
}