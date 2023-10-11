//Noah Ice
//CST-452 Milestone
//BoardColumn is the columns within board. The contain tasks
//SQL Queries to manage database
export const boardColumnQueries = {

    readBoardColumns: `
    SELECT * FROM scrumboardapp.board_columns
    `,
    readBoardColumnById: `
    SELECT * FROM scrumboardapp.board_columns WHERE scrumboardapp.board_columns.board_column_id = ?
    `,
    readBoardColumnByBoardId: `
    SELECT * FROM scrumboardapp.board_columns WHERE scrumboardapp.board_columns.board_id = ?
    `,
    getBoardColumnsByTaskListId: `
    SELECT * FROM scrumboardapp.board_columns WHERE scrumboardapp.board_columns.tasklist_id = ?
    `,
    createBoardColumn: `
    INSERT INTO scrumboardapp.board_columns ( board_id, title, position, tasklist_id ) VALUES ( ?, ?, ?, ? )
    `,
    updateBoardColumn: `
    UPDATE scrumboardapp.board_columns SET board_id = ?, title = ?, position = ? WHERE board_column_id = ?
    `,
    deleteBoardColumn: `
    DELETE FROM scrumboardapp.board_columns WHERE board_column_id = ?
    `
}