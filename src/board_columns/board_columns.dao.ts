//Noah Ice
//CST-339 Milestone
//BoardColumn is the columns within board. The contain tasks
//BoardColumn DAO is used to manage data access for the board column
import { execute } from "../services/mysql.connector";
import { BoardColumn } from "./board_columns.model";
import { boardColumnQueries } from "./board_columns.queries";
import { OkPacket } from "mysql"

//Read all columns
export const readBoardColumns = async () => {
    return execute<BoardColumn[]>(boardColumnQueries.readBoardColumns, []);
};

//Read column given Id
export const readBoardColumnById = async (board_column_id: number) => {
    return execute<BoardColumn[]>(boardColumnQueries.readBoardColumnById, [board_column_id]);
};

//Read column given board_id
export const readBoardColumnByBoardId = async (board_id: number) => {
    return execute<BoardColumn[]>(boardColumnQueries.readBoardColumnByBoardId, [board_id]);
}

export const getBoardColumnsByTaskListId = async (tasklist_id: string) => {
    return execute<BoardColumn[]>(boardColumnQueries.getBoardColumnsByTaskListId, [tasklist_id]);
}

//Read column given board_id
export const readBoardColumnByBoardIdGoogle = async (board_id: string) => {
    return execute<BoardColumn[]>(boardColumnQueries.readBoardColumnByBoardId, [board_id]);
}

//Create column given json object
export const createBoardColumn = async (board_column: BoardColumn) => {
    return execute<OkPacket>(boardColumnQueries.createBoardColumn, [
        board_column.board_id,
        board_column.title,
        board_column.position

    ]);
};

//update column given json object
export const updateBoardColumn = async (board_column: BoardColumn) => {
    return execute<OkPacket>(boardColumnQueries.updateBoardColumn, [
        board_column.board_id,
        board_column.title,
        board_column.position,
        board_column.board_column_id
    ]);
};

//Delete column given Id
export const deleteBoardColumn = async (board_column_id: number) => {
    return execute<BoardColumn[]>(boardColumnQueries.deleteBoardColumn, [board_column_id]);
};

