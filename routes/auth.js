const express = require('express')
const router = express.Router()
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.AZURE_SQL_USERNAME,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true,
        port: Number(process.env.AZURE_SQL_PORT)
    },
    connectionTimeout: 30000,
    requestTimeout: 30000,
};

router.post('/ADD_USER', async (req, res) => {
    let pool;
    try {
            pool = await sql.connect(config) 
            Id = req.body.Id
            Name = req.body.Name
            Email = req.body.Email
            
            const result = await pool.request().query(`INSERT INTO Users (Id, Name, Email) VALUES ('${Id}', '${Name}', '${Email}')`)
            res.status(200).json({ message: 'User added successfully', user: req.body})
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (pool) {
                pool.close();
            }
        }
})

// get a users individual comments

module.exports = router;