import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Apple@0109",
  database: "gcc_circle",
});

export default pool;