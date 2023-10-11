//Noah Ice
//CST-452 Milestone
//Tasks are used to stored the information of the tasks on each board

import { User } from "../users/users.model";

//Structure for tasks
export interface Task {
    task_id: number,
    board_id: number,
    board_column_id: number,
    title: string,
    description: string,
    assignee: number,
    reviewer: number,
    story_points: number,
    priority: number,
    google_id: string,
    due: string
}