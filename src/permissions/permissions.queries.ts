//Noah Ice
//CST-339 Milestone
//Permissions link the boards and the users together and manage which users have access to which boards
//SQL Queries to manage the database
export const permissionQueries = {
    readPermissions: `
    SELECT * FROM scrumboardapp.permissions
    `,
    readPermissionById: `
    SELECT * FROM scrumboardapp.permissions WHERE scrumboardapp.permissions.permission_id = ?
    `,
    readPermissionByUserId: `
    SELECT * FROM scrumboardapp.permissions WHERE scrumboardapp.permissions.user_id = ?
    `,
    readPermissionByEmail: `
    SELECT * FROM scrumboardapp.permissions WHERE scrumboardapp.permissions.email = ?
    `,
    readPermissionsBoardId: `
    SELECT * FROM scrumboardapp.permissions WHERE scrumboardapp.permissions.board_id = ?`,
    createPermission: `
    INSERT INTO scrumboardapp.permissions ( user_id, board_id, type ) VALUES ( ?, ?, ? )
    `,
    updatePermission: `
    UPDATE scrumboardapp.permissions SET user_id = ?, board_id = ?, type = ? WHERE permission_id = ?
    `,
    deletePermission: `
    DELETE FROM scrumboardapp.permissions WHERE permission_id = ?
    `
}