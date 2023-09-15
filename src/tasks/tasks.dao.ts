//Noah Ice
//CST-339 Milestone
//Tasks are used to stored the information of the tasks on each board
import { execute } from "../services/mysql.connector";
import { Task } from "./tasks.model";
import { taskQueries } from "./tasks.queries";
import { OkPacket } from "mysql"

//Read all tasks
export const readTasks = async () => {
    return execute<Task[]>(taskQueries.readTasks, []);
};

//Read one task given an Id
export const readTaskById = async (task_id: number) => {
    return execute<Task[]>(taskQueries.readTaskById, [task_id]);
};

//Get all tasks with a matching google_id 
export const getMatchingGoogleTasks = async (google_ids: string) => {
    return execute<Task[]>(taskQueries.getMatchingGoogleTasks, google_ids);
};

//Read a task given a column Id
export const readTaskByColumnId = async (board_column_id: number) => {
    return execute<Task[]>(taskQueries.readTaskByColumnId, [board_column_id]);
};

//Create a new task
export const createTask = async (task: Task) => {
    return execute<OkPacket>(taskQueries.createTask, [
        task.board_id,
        task.board_column_id,
        task.title,
        task.description,
        task.assignee,
        task.reviewer,
        task.story_points,
        task.priority,
        task.google_id,
        task.user_id
    ]);
};

//Update a task
export const updateTask = async (task: Task) => {
    return execute<OkPacket>(taskQueries.updateTask, [
        task.board_id,
        task.board_column_id,
        task.title,
        task.description,
        task.assignee,
        task.reviewer,
        task.story_points,
        task.priority,
        task.task_id
    ]);
};

//Delete a task given an Id
export const deleteTask = async (task_id: number) => {
    return execute<Task[]>(taskQueries.deleteTask, [task_id]);
};

