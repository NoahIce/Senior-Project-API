//Noah Ice
//CST-452 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
import { execute } from "../services/mysql.connector";
import { Board } from "./boards.model";
import { boardQueries } from "./boards.queries";
import { OkPacket } from "mysql"

//Read all boards
export const readBoards = async () => {
    return execute<Board[]>(boardQueries.readBoards, []);
};

//Read a board by Id
export const readBoardById = async (board_id: number) => {
    return execute<Board[]>(boardQueries.readBoardById, [board_id]);
};

//Read a board given a user_id
export const readBoardByUserId = async (user_id: number) => {
    return execute<Board[]>(boardQueries.readBoardByUserId, [user_id]);
};

export const readBoardByTasksListId = async (tasklist_id: string) => {
    return execute<Board[]>(boardQueries.readBoardByTasksListId, [tasklist_id]);
};

//Create a new board
export const createBoard = async (board: Board) => {
    return execute<OkPacket>(boardQueries.createBoard, [
        board.title,
        board.tasklist_id
    ]);
};

//Update a board
export const updateBoard = async (board: Board) => {
    return execute<OkPacket>(boardQueries.updateBoard, [
        board.title,
        board.board_id
    ]);
};

//Delete a board
export const deleteBoard = async (board_id: number) => {
    return execute<Board[]>(boardQueries.deleteBoard, [board_id]);
};

