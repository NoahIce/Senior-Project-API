//Noah Ice
//CST-339 Milestone
//BoardColumn is the columns within board. The contain tasks
//The model is the client side version of the data in the database
import { Task } from "../tasks/tasks.model";

//BoardColumn structure
export interface BoardColumn {
    board_column_id: number,
    board_id: number,
    title: string,
    position: number,
    tasks: Task[];
}