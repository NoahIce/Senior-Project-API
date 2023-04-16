//Noah Ice
//CST-339 Milestone
//Users are used to stored the information linked to each user
//SQL Queries for managing the database
export const userQueries = {
    readUsers: `
    SELECT * FROM scrumboardapp.users
    `,
    readUserById: `
    SELECT * FROM scrumboardapp.users WHERE scrumboardapp.users.user_id = ?
    `,
    readUserByEmail: `
    SELECT * FROM scrumboardapp.users WHERE scrumboardapp.users.email = ?
    `,
    authenticateUser: `
    SELECT * FROM scrumboardapp.users WHERE scrumboardapp.users.email = ? AND scrumboardapp.users.password = ?
    `,
    createUser: `
    INSERT INTO scrumboardapp.users ( email, first_name, last_name, password ) VALUES ( ?, ?, ?, ? )
    `,
    updateUser: `
    UPDATE scrumboardapp.users SET email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?
    `,
    deleteUser: `
    DELETE FROM scrumboardapp.users WHERE user_id = ?
    `
}