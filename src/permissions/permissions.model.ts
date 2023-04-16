//Noah Ice
//CST-339 Milestone
//Permissions link the boards and the users together and manage which users have access to which boards

import { Board } from "../boards/boards.model"

//Structure for permission object
export interface Permission {
    permission_id: number,
    user_id: number,
    board_id: number,
    boards: Board[],
    type: string
}