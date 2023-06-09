//Noah Ice
//CST-339 Milestone
//Permissions link the boards and the users together and manage which users have access to which boards
import { execute } from "../services/mysql.connector";
import { Permission } from "./permissions.model";
import { permissionQueries } from "./permissions.queries";
import { OkPacket } from "mysql"

//Get all permissions
export const readPermissions = async () => {
    return execute<Permission[]>(permissionQueries.readPermissions, []);
};

//Get one permissions by an Id
export const readPermissionById = async (permission_id: number) => {
    return execute<Permission[]>(permissionQueries.readPermissionById, [permission_id]);
};

//Get all permissions with a given user Id
export const readPermissionByUserId = async (user_id: number) => {
    return execute<Permission[]>(permissionQueries.readPermissionByUserId, [user_id]);
}

//Create new permission
export const createPermission = async (permission: Permission) => {
    return execute<OkPacket>(permissionQueries.createPermission, [
        permission.user_id,
        permission.board_id,
        permission.type,
    ]);
};

//Update a permission
export const updatePermission = async (permission: Permission) => {
    return execute<OkPacket>(permissionQueries.updatePermission, [
        permission.user_id,
        permission.board_id,
        permission.type,
        permission.permission_id,
    ]);
};

//Delete permission
export const deletePermission = async (permission_id: number) => {
    return execute<Permission[]>(permissionQueries.deletePermission, [permission_id]);
};

