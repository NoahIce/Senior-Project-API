//Noah Ice
//CST-452 Milestone
//Users are used to stored the information linked to each user
import { Router } from "express";
import * as usersController from "./users.controller";

const router = Router();

//Routes
router.route("/users").get(usersController.readUsers); //Read all
router.route("/users/readUserById").get(usersController.readUserById); //Read one
router.route("/users/readUserByEmail").get(usersController.readUserByEmail);
router.route("/users/authenticate").get(usersController.authenticateUser); //Authenticate
router.route("/users/createUser").post(usersController.createUser); //Create
router.route("/users/updateUser").put(usersController.updateUser); //Update 
router.route("/users/deleteUser/:user_id").delete(usersController.deleteUser); //Delete

export default router