//Noah Ice
//CST-339 Milestone
//This service manages the connection to the backend
import { createPool, Pool } from "mysql";

let pool: Pool | null = null;
//Make new pool and test connections
const initializeMySqlConnector = () => {
  //Variables
  let MY_SQL_DB_HOST = "127.0.0.1";
  let MY_SQL_DB_USER = "root";
  let MY_SQL_DB_PASSWORD = "root";
  let MY_SQL_DB_PORT = "3307";
  let MY_SQL_DB_DATABASE = "scrumboardapp";
  let MY_SQL_DB_CONNECTION_LIMIT = "10";

  //Try to create new pool
  try {
    pool = createPool({
      connectionLimit: parseInt(
        MY_SQL_DB_CONNECTION_LIMIT != undefined
          ? MY_SQL_DB_CONNECTION_LIMIT
          : ""
      ),
      port: parseInt(MY_SQL_DB_PORT != undefined ? MY_SQL_DB_PORT : ""),
      host: MY_SQL_DB_HOST,
      user: MY_SQL_DB_USER,
      password: MY_SQL_DB_PASSWORD,
      database: MY_SQL_DB_DATABASE,
    });

    console.debug("MySql Adapter Pool generated successfully");
    console.log("process.env.DB_DATABASE", MY_SQL_DB_DATABASE),
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("error mysql failed to connect");
          throw new Error("not able to connect to database");
        } else {
          console.log("connection made");
          connection.release();
        }
      });
  } catch (error) {
    console.error(
      "[mysql.connector] [initializeMySqlConnector] [Error]: ",
      error
    );
    throw new Error("failed to initialized pool");
  }
};

//Execute sql query 
export const execute = <T>(
  query: string,
  params: string[] | Object
): Promise<T> => {
  try {
    //If pool hasn't been initialized create new one
    if (!pool) {
      initializeMySqlConnector();
    }

    return new Promise<T>((resolve, reject) => {
      pool!.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error(" [ mysql.connector ] [ execute ] [ Error ] : ", error);
    throw new Error(" failed to execute MySQL query ");
  }
};
