//Noah Ice
//CST-339 Milestone
//Users are used to stored the information linked to each user
import { Response, Request, RequestHandler, response } from "express";
import { User } from "./users.model";
import * as UserDAO from "./users.dao"
import { Board } from "../boards/boards.model"
import * as BoardDAO from "../boards/boards.dao"
import * as PermissionDao from "../permissions/permissions.dao"
import { OkPacket } from "mysql";
import * as BoardsController from "../boards/boards.controller"
import * as PermissionsController from "../permissions/permissions.controller"

//Function to read all users
export const readUsers: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get all users
        let users = await UserDAO.readUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUsers");
    }

}

//Function to read a user given an Id
export const readUserById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get user by Id
        let user = await UserDAO.readUserById(parseInt(req.query.user_id as string));
        await readPermissions(user).then(() => {
            console.log(user);
            //console.log(user[0].permissions);
            res.status(200).json(user);
        })
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
    }
}

export const readUserByEmail: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Get user by Id
        console.log(req.query.email);
        let user = await UserDAO.readUserByEmail(req.query.email as string);
        await readPermissions(user).then(() => {
            //console.log(user[0].permissions[0].boards);
            //res.status(200).json(user);
        })
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in users.controller.readUserById");
    }
}

export const authenticateUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Authenticate user
        let user = await UserDAO.authenticateUser(req.query.email as string, req.query.password as string);
        await readPermissions(user).then(() => {
            console.log(user);
            console.log(user[0].permissions);
            res.status(200).json(user);
        })

    } catch (error) {
        console.log(error + "\nError in users.controller.authenticateUser awd")
        res.status(401).json({ status: 401 });
    }
}

//Create a new user given a json with everything except Id
export const createUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Create new user
        const OkPacket: OkPacket = await UserDAO.createUser(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.createUser")
    }
}

//Update user given a full object
export const updateUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Update user
        const OkPacket: OkPacket = await UserDAO.updateUser(req.body);
        res.status(200).json(OkPacket);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

//Delete user given Id
export const deleteUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        //Delete User
        let user = await UserDAO.deleteUser(parseInt(req.params.user_id as string));
        res.status(200).json(user);
    } catch (error) {
        console.log(error + "\nError in users.controller.updateUser")
    }
}

async function readPermissions(users: User[]) {
    try {
        if (users != null) {
            for (let i = 0; i < users.length; i++) {
                users[i].permissions = await PermissionsController.readPermissionsByEmail(users[i].email);
            }
        }
        else console.log("here")
    }
    catch (error) {
        console.log("Error reading permissions")
    }

}
