import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T2000!@#m11p24",
    database: "test",
});

export default db