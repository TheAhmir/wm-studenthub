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

router.post('/CREATE_REVIEW', async (req, res) => {
    let pool;
    try {
            pool = await sql.connect(config)

            const { courseId, userId, difficulty, workload, professor, body } = req.body;

            const request = pool.request();
            request.input('courseId', sql.VARCHAR(36), courseId);
            request.input('userId', sql.VARCHAR(36), userId);
            request.input('difficulty', sql.FLOAT, difficulty);
            request.input('workload', sql.FLOAT, workload);
            request.input('body', sql.VARCHAR(255), body);

            if (professor === '') {
                request.input('professor', sql.VARCHAR(255), null);  // Use null for empty string
            } else {
                request.input('professor', sql.VARCHAR(255), professor);
            }

            let query = `
            INSERT INTO Reviews (Id, CourseId, UserId, Difficulty, Workload, Professor, Body) 
            VALUES (NEWID(), @courseId, @userId, @difficulty, @workload, @professor, @body)
            `;

            const result = await request.query(query)
            res.status(200).json({ message: 'Review created successfully', user: req.body})
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (pool) {
                pool.close();
            }
        }
})

// Route to get filtered data from reviews by individual course
router.get('/:id', async (req, res) => {
    let pool;
    try {
        pool = await sql.connect(config)

        const Id = req.params.id

        let query = `
SELECT Reviews.Id, CourseId, UserId, Name, Difficulty, Workload, Professor, Body, CreatedAt FROM Reviews
JOIN Users 
    ON Users.Id = Reviews.UserId
WHERE courseId = '335D4143-080A-417F-86CA-BCCBE7688481'
`

        const result = await pool.request()
            .input('Id', sql.VARCHAR(36), Id)
            .query(`SELECT Reviews.Id, CourseId, UserId, Name, Difficulty, Workload, Professor, Body, CreatedAt FROM Reviews
                JOIN Users
                    ON Users.Id = Reviews.UserId 
                WHERE courseId = @Id`)
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'No data found' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        res.status(500).send("Error connecting to MongoDB");
        console.error(error);
    } finally {
        if (pool) {
            pool.close()
        }
    }
});

module.exports = router;