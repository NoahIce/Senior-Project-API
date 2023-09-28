//Noah Ice
//CST-339 Milestone
//Permissions link the boards and the users together and manage which users have access to which boards
import { Response, Request, RequestHandler, response } from "express";
import { Permission } from "./permissions.model";
import * as PermissionDAO from "./permissions.dao"
import { OkPacket } from "mysql";
import * as BoardsController from "../boards/boards.controller"

//Function to get all permissions
export const readPermissions: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all permissions
        let permissions = await PermissionDAO.readPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUsers");
    }

}

//Function to read one permissions given permission_id
export const readPermissionById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all permissions with given Id
        let permission = await PermissionDAO.readPermissionById(parseInt(req.query.permission_id as string));
        res.status(200).json(permission);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
    }
}

export async function readPermissionsByUserId(user_id: number): Promise<Permission[]> {
    try {
        //Get all permissions with given Id
        let permission = await PermissionDAO.readPermissionByUserId(user_id);
        if (permission != null) {
            console.log("full")
            await readBoards(permission);
            return permission;
        }
        else {
            console.log("empyt");
            return []
        }
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
        return [];
    }
}

export async function readPermissionsByEmail(email: string): Promise<Permission[]> {
    try {
        //Get all permissions with given Id
        let permission = await PermissionDAO.readPermissionByEmail(email);
        if (permission != null) {
            console.log("full")
            await readBoards(permission);
            return permission;
        }
        else {
            console.log("empyt");
            return []
        }
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
        return [];
    }
}

//Function to create permission
export const createPermission: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const OkPacket: OkPacket = await PermissionDAO.createPermission(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.createUser")
    }
}

//Function to update permission given a JSON object
export const updatePermission: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const OkPacket: OkPacket = await PermissionDAO.updatePermission(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Function to delete permission
export const deletePermission: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        let permission = await PermissionDAO.deletePermission(parseInt(req.params.permission_id as string));
        res.status(200).json(permission);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

async function readBoards(permissions: Permission[]): Promise<Permission[]> {
    try {
        for (let i = 0; i < permissions.length; i++) {
            permissions[i].boards = await BoardsController.readBoardByTasksListId(permissions[i].tasklist_id);
        }
    }
    catch (error) {
        console.log("Error reading tasks")
    }
    return permissions;
}