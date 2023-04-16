//Noah Ice
//CST-339 Milestone
//Permissions link the boards and the users together and manage which users have access to which boards
import { Router } from "express";
import * as permissionsController from "./permissions.controller";

const router = Router();

//Routes
router.route("/permissions").get(permissionsController.readPermissions); //Read all
router.route("/permissions/readPermissionById").get(permissionsController.readPermissionById); //Read one
router.route("/permissions/createPermissions").post(permissionsController.createPermission); //Create
router.route("/permissions/updatePermissions").put(permissionsController.updatePermission); //Update
router.route("/permissions/deletePermissions/:permission_id").delete(permissionsController.deletePermission); //Delete

export default router