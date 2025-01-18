import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: "localhost",       // Host from @@hostname
    user: "root",            // Your MySQL username
    password: "Dikshant@DB20", // The password you used for the user
    database: "nimap", // The database you want to connect to
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default db;
