//Noah Ice
//CST-452 Milestone
//Main File
import express, { Request, Response } from "express";
import usersRouter from "./users/users.routes";
import permissionsRouter from "./permissions/permissions.routes";
import boardsRouter from "./boards/boards.routes";
import boardColumnsRouter from "./board_columns/board_columns.routes";
import tasksRouter from "./tasks/tasks.routes";
import cors from "cors";
require('dotenv').config();

//Start
const app = express();
const port = 3000;



//Start in dev mode
if (process.env.NODE_ENV == "development") {
    console.log(process.env.greeting + " in dev mode ");
}

//Get data for json body 
app.use(express.json());
app.use(express.urlencoded());

//User Cors
app.use(cors());

app.use("/", [usersRouter, permissionsRouter, boardsRouter, boardColumnsRouter, tasksRouter]);
//Listen on port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
