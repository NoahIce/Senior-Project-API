//Noah Ice
//CST-452 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
import { Router } from "express";
import * as boardsController from "./boards.controller";

const router = Router();

//Routes
router.route("/boards").get(boardsController.readBoards); //Read all
router.route("/boards/readBoardById").get(boardsController.readBoardById); //Read one 
router.route("/boards/createBoard").post(boardsController.createBoard); //Create
router.route("/boards/updateBoard").put(boardsController.updateBoard); //Update
router.route("/boards/deleteBoard/:board_id").delete(boardsController.deleteBoard); //Delete

export default router