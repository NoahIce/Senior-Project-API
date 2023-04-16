//Noah Ice
//CST-339 Milestone
//BoardColumn is the columns within board. The contain tasks
//Board_column.controller controls all of the stuff the board column does like getting and setting infomation
import { Response, Request, RequestHandler, response } from "express";
import { BoardColumn } from "./board_columns.model";
import * as BoardColumnDAO from "./board_columns.dao"
import * as TaskDAO from "../tasks/tasks.dao"
import { OkPacket } from "mysql";

// Function to read all of the board columns in the database
export const readBoardColumns: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all columns
        let columns = await BoardColumnDAO.readBoardColumns();
        //Attach tasks to columns
        await readTasks(columns);

        res.status(200).json(columns);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUsers");
    }

}
//Function to read a column given an Id
export const readBoardColumnById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get columns given and Id from request.query.board_column_id
        let columns = await getBoardColumnsById(parseInt(req.query.board_column_id as string));
        //Attach tasks to columns
        await readTasks(columns);
        res.status(200).json(columns);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
    }
}

//Function to get a columns given an Id but this can be used by other controllers like the boards.controller
export async function getBoardColumnsById(board_column_id: number) {
    //Use DAO to get columns 
    let columns = await BoardColumnDAO.readBoardColumnById(board_column_id);
    await readTasks(columns);
    return columns;
}

export async function getBoardColumnsByBoardIdFunction(board_id: number): Promise<BoardColumn[]> {
    try {
        //Get columns given and Id from request.query.board_column_id
        let columns = await BoardColumnDAO.readBoardColumnByBoardId(board_id);
        //Attach tasks to columns
        await readTasks(columns);
        return columns;
    } catch (error) {
        return [];
        console.log(error + "\nError in users.controller.readUserById");
    }
}

//Function to add a new board column to the database
//Takes a json object with all field in the BoardColumns table but not the Id
export const createBoardColumn: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Create an object with request.body
        const OkPacket: OkPacket = await BoardColumnDAO.createBoardColumn(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.createUser")
    }
}

//Function to take an existing column and update it
//This takes a json object from req.body and keeps the existing Id 
export const updateBoardColumn: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Update column
        const OkPacket: OkPacket = await BoardColumnDAO.updateBoardColumn(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Function to delete a column given an Id
export const deleteBoardColumn: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Delete all the tasks first
        deleteTasks(parseInt(req.params.board_column_id as string));
        //Then delete the column itself
        let columns = await BoardColumnDAO.deleteBoardColumn(parseInt(req.params.board_column_id as string));
        await readTasks(columns);
        res.status(200).json(columns);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Function to get all the tasks associated with a board column and attach it to the object
async function readTasks(columns: BoardColumn[]) {
    try {
        for (let i = 0; i < columns.length; i++) {
            columns[i].tasks = await TaskDAO.readTaskByColumnId(columns[i].board_column_id);
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
}

//Function to find and delete all the tasks associated with a column
async function deleteTasks(board_column_id: number) {
    try {
        let tasks = await TaskDAO.readTaskByColumnId(board_column_id);
        for (let i = 0; i < tasks.length; i++) {
            TaskDAO.deleteTask(tasks[i].task_id);
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
}