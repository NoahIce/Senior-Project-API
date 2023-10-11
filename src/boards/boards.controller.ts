//Noah Ice
//CST-452 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
import { Response, Request, RequestHandler, response } from "express";
import { Board } from "./boards.model";
import { Permission } from "../permissions/permissions.model"
import * as BoardDAO from "./boards.dao"
import * as BoardColumnsDAO from "../board_columns/board_columns.dao"
import * as PermissionsDAO from "../permissions/permissions.dao"
import { BoardColumn } from "../board_columns/board_columns.model";
import * as BoardColumnsController from "../board_columns/board_columns.controller"
import { OkPacket } from "mysql";

//Function to read all boards
export const readBoards: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all boards
        let boards = await BoardDAO.readBoards();
        //Attach columns to boards
        await readColumns(boards);
        res.status(200).json(boards);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUsers");
    }

}

//Function to read a board in given an Id
export const readBoardById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get board by Id
        let board = await BoardDAO.readBoardById(parseInt(req.query.board_id as string));
        //Attach columns to boards
        readColumns(board);
        res.status(200).json(board);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
    }
}

export async function readBoardByIdFunction(board_id: number): Promise<Board[]> {
    try {
        //Get board by Id
        let board = await BoardDAO.readBoardById(board_id);
        //Attach columns to boards
        await readColumns(board);
        return board;
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
        return [];
    }
}

export async function readBoardByUserId(user_id: number): Promise<Board[]> {
    try {
        //Get board by Id
        let board = await BoardDAO.readBoardByUserId(user_id);
        //Attach columns to boards
        readColumns(board);
        return board
    } catch (error) {
        console.log(error + "\nError in boards.controller.readBoardsByUserId");
        return [];
    }
}

export async function readBoardByTasksListId(tasklist_id: string): Promise<Board[]> {
    try {
        //Get board by Id
        let board = await BoardDAO.readBoardByTasksListId(tasklist_id);
        //Attach columns to boards
        await readColumns(board);
        return board
    } catch (error) {
        console.log(error + "\nError in boards.controller.readBoardsByUserId");
        return [];
    }
}

//Create board given all fields except Id since Id is auto increment
export const createBoard: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Create board
        const OkPacket: OkPacket = await BoardDAO.createBoard(req.body);
        res.status(200).json(OkPacket);
        console.log(req.body)
        let board_id = OkPacket.insertId;
        createPermission(req.body.user_id, board_id, req.body.email, req.body.tasklist_id);
        createBoardColumn(board_id, "ToDo", 1, req.body.tasklist_id);
        createBoardColumn(board_id, "In Progress", 2, req.body.tasklist_id);
        createBoardColumn(board_id, "Done", 3, req.body.tasklist_id);
    } catch (error) {
        console.log(error + "\nError in users.controller.createUser")
    }
}

async function createPermission(user_id: number, board_id: number, email: string, tasklist_id: string) {
    try {
        var permission: Permission = {
            permission_id: -1,
            user_id: user_id,
            board_id: board_id,
            type: "admin",
            boards: [],
            tasklist_id: tasklist_id,
            email: email,
        }

        await PermissionsDAO.createPermission(permission)
    }
    catch (error) {
        console.log(error + "Error reading tasks")
    }
}

async function createBoardColumn(board_id: number, title: string, position: number, tasklist_id: string) {
    try {
        let column: BoardColumn = {
            board_id: board_id,
            title: title,
            position: position,
            tasklist_id: tasklist_id,
            board_column_id: -1,
            tasks: []
        }

        await BoardColumnsDAO.createBoardColumn(column)
    }
    catch (error) {
        console.log(error + "Error reading tasks")
    }
}

//Function to update board given a json object with all fields
export const updateBoard: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Update a board 
        const OkPacket: OkPacket = await BoardDAO.updateBoard(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Delete a board given Id
export const deleteBoard: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Delete all columns first
        deleteBoardColumns(parseInt(req.params.board_id as string));
        //Delete all permissions first
        await deleteBoardPermissions(parseInt(req.params.board_id as string));
        //Delete board
        let board = await BoardDAO.deleteBoard(parseInt(req.params.board_id as string));

        await BoardColumnsDAO.deleteBoardColumn
        res.status(200).json(board);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Function to get all columns and attach them to a board
async function readColumns(boards: Board[]) {
    try {
        for (let i = 0; i < boards.length; i++) {
            console.log(boards[i])
            boards[i].boardColumns = await BoardColumnsController.getBoardColumnsByTaskListId(boards[i].tasklist_id);
            console.log(boards[i])
            //console.log(boards[i].boardColumns)
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
}

//Function to get all columns associated with a board and delete them
async function deleteBoardColumns(board_id: number) {
    try {
        let boardColumns = await BoardColumnsDAO.readBoardColumnByBoardId(board_id);
        for (let i = 0; i < boardColumns.length; i++) {
            BoardColumnsDAO.deleteBoardColumn(boardColumns[i].board_column_id);
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
}

//Function to delete all permissions with a board
async function deleteBoardPermissions(board_id: number) {
    try {
        let boardPermissions = await PermissionsDAO.readPermissionsBoardId(board_id);
        for (let i = 0; i < boardPermissions.length; i++) {
            PermissionsDAO.deletePermission(boardPermissions[i].permission_id);
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
}
