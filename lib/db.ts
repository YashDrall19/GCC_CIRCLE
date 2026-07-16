// import mysql from 'mysql2/promise';

// declare global {
//   // allow global var for dev to avoid creating new pools on HMR
//   // eslint-disable-next-line no-var
//   var __mysqlPool: any | undefined;
// }

// const connectionLimit = parseInt(process.env.MYSQL_CONN_LIMIT || '5', 10);

// const createPool = () =>
//   mysql.createPool({
//     host: process.env.MYSQL_HOST || 'localhost',
//     user: process.env.MYSQL_USER || 'root',
//     password: process.env.MYSQL_PASSWORD || '',
//     database: process.env.MYSQL_DATABASE || 'gcc_circle',
//     waitForConnections: true,
//     connectionLimit,
//     queueLimit: 0,
//   });

// const pool = global.__mysqlPool || createPool();
// if (process.env.NODE_ENV !== 'production') global.__mysqlPool = pool;

// export default pool;


import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Apple@0109',
  database: process.env.MYSQL_DATABASE || 'gcc_circle',

  dateStrings: true,
});

export default pool;
