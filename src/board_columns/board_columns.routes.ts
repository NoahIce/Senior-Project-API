//Noah Ice
//CST-339 Milestone
//BoardColumn is the columns within board. The contain tasks
//Routes to manages how to user gets data
import { Router } from "express";
import * as boardColumnsController from "./board_columns.controller";

const router = Router();

//Routes
router.route("/boardColumns").get(boardColumnsController.readBoardColumns); //get all
router.route("/boardColumns/readBoardColumnById").get(boardColumnsController.readBoardColumnById); //get by id
router.route("/boardColumns/createBoardColumn").post(boardColumnsController.createBoardColumn); //create
router.route("/boardColumns/updateBoardColumn").put(boardColumnsController.updateBoardColumn); //update
router.route("/boardColumns/deleteBoardColumn/:board_column_id").delete(boardColumnsController.deleteBoardColumn); //delete

export default router