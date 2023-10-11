//Noah Ice
//CST-452 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
import { BoardColumn } from "../board_columns/board_columns.model";

//Structure for boards
export interface Board {
    board_id: number,
    title: string,
    boardColumns: BoardColumn[],
    tasklist_id: string
}