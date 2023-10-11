//Noah Ice
//CST-452 Milestone
//Users are used to stored the information linked to each user
import { execute } from "../services/mysql.connector";
import { User } from "./users.model";
import { userQueries } from "./users.queries";
import { OkPacket } from "mysql"

//Read all users
export const readUsers = async () => {
    return execute<User[]>(userQueries.readUsers, []);
};

//Read user by Id
export const readUserById = async (user_id: number) => {
    return execute<User[]>(userQueries.readUserById, [user_id]);
};

export const readUserByEmail = async (email: string) => {
    return execute<User[]>(userQueries.readUserByEmail, [email]);
};

//Authenticate User
export const authenticateUser = async (email: string, password: string) => {
    return execute<User[]>(userQueries.authenticateUser, [email, password]);
};

//Create User
export const createUser = async (user: User) => {
    return execute<OkPacket>(userQueries.createUser, [
        user.email,
        user.first_name,
        user.last_name,
        user.password,
    ]);
};

//Update a user
export const updateUser = async (user: User) => {
    return execute<OkPacket>(userQueries.updateUser, [
        user.email,
        user.first_name,
        user.last_name,
        user.password,
        user.user_id,
    ]);
};

//Delete a User
export const deleteUser = async (user_id: number) => {
    return execute<User[]>(userQueries.deleteUser, [user_id]);
};

