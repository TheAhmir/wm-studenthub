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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get a users individual reviews
router.get('/reviews/:id', async (req, res) => {
    let pool;
    try {
            pool = await sql.connect(config)
            const id = req.params.id
            const request = await pool.request().query(`
                SELECT Reviews.Id as Id, Prefix, Code, Title, Difficulty, Workload, Professor, Body, CreatedAt  FROM Reviews
                JOIN USERS ON Users.Id = Reviews.UserId
                JOIN Courses On Courses.Id = Reviews.CourseId
                WHERE UserId = '${id}'`)
            res.status(200).json(request.recordset)
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (pool) {
                pool.close();
            }
        }
})

module.exports = router;
