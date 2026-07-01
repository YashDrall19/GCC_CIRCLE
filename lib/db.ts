import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Apple@0109',
  database: process.env.MYSQL_DATABASE || 'gcc_circle',
});

export default pool;
