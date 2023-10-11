//Noah Ice
//CST-452 Milestone
//Users are used to stored the information linked to each user
import { Permission } from "../permissions/permissions.model";

//Structure for users
export interface User {
    user_id: number,
    email: string,
    first_name: string,
    last_name: string,
    password: string
    permissions: Permission[];
}