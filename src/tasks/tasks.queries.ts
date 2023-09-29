//Noah Ice
//CST-339 Milestone
//Tasks are used to stored the information of the tasks on each board
//SQL Queries for managing a database
export const taskQueries = {
    readTasks: `
    SELECT * FROM scrumboardapp.tasks
    `,
    readTaskById: `
    SELECT * FROM scrumboardapp.tasks WHERE scrumboardapp.tasks.task_id = ?
    `,
    getMatchingGoogleTasks: `
    SELECT * FROM scrumboardapp.tasks WHERE google_id = ?
    `,
    readTaskByColumnId: `
    SELECT * FROM scrumboardapp.tasks WHERE scrumboardapp.tasks.board_column_id = ?
    `,
    createTask: `
    INSERT INTO scrumboardapp.tasks ( board_id, board_column_id, title, description, assignee, reviewer, story_points, priority, google_id, due ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
    `,
    updateTask: `
    UPDATE scrumboardapp.tasks SET board_id = ?, board_column_id = ?, title = ?, description = ?, assignee = ?, reviewer = ?, story_points = ?, priority = ?, due = ? WHERE task_id = ?
    `,
    deleteTask: `
    DELETE FROM scrumboardapp.tasks WHERE task_id = ?
    `
}