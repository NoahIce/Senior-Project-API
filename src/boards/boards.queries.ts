//Noah Ice
//CST-339 Milestone
//boards are where the users manages their tasks. They contain Board Columns 
//SQL Queries to manage the database
export const boardQueries = {
    readBoards: `
    SELECT * FROM scrumboardapp.boards
    `,
    readBoardById: `
    SELECT * FROM scrumboardapp.boards WHERE scrumboardapp.boards.board_id = ?
    `,
    readBoardByUserId: `
    SELECT * FROM scrumboardapp.boards WHERE scrumboardapp.boards.user_id = ?
    `,
    readBoardByTasksListId: `
    SELECT * FROM scrumboardapp.boards WHERE scrumboardapp.boards.tasklist_id = ?
    `,
    createBoard: `
    INSERT INTO scrumboardapp.boards ( title, tasklist_id ) VALUES ( ?, ? )
    `,
    updateBoard: `
    UPDATE scrumboardapp.boards SET title = ? WHERE board_id = ?
    `,
    deleteBoard: `
    DELETE FROM scrumboardapp.boards WHERE board_id = ?
    `
}