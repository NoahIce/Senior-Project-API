//Noah Ice
//CST-339 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
import { BoardColumn } from "../board_columns/board_columns.model";

//Structure for boards
export interface Board {
    board_id: number,
    title: string,
    boardColumns: BoardColumn[]
}