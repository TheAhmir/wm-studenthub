const express = require('express');
const router = express.Router();
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

// Route to list all collection names
router.get('/', async (req, res) => {
    let pool;
    try {
        pool = await sql.connect(config);

        const result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME <> 'database_firewall_rules'");

        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'No data found' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        res.status(500).send("Error connecting to SQL Server");
        console.error(error);
    } finally {
        if (pool) {
            pool.close()
        }
    }
});

// Route to get all data from a specific collection
router.get('/:collectionName', async (req, res) => {
    let pool;
    try {
        pool = await sql.connect(config);

        const collectionName = req.params.collectionName;

        let result;
        if (collectionName === 'Courses') {
            result = await pool.request().query(`SELECT * FROM ${collectionName} ORDER BY 'Prefix' ASC, 'Code' ASC`)
        }
        else {
            result = await pool.request().query(`SELECT * FROM ${collectionName}`)
        }
        
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'No data found' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        res.status(500).send("Error connecting to SQL Server");
        console.error(error);
    } finally {
        if (pool) {
            pool.close()
        }
    }
});

// Route to get all data from a specific document
router.get('/:collectionName/:id', async (req, res) => {
    let pool;
    try {
        pool = await sql.connect(config)

        const collectionName = req.params.collectionName;

        const Id = req.params.id;

        const result = await pool.request()
        .input('Id', sql.UniqueIdentifier, Id)
        .query(`SELECT * FROM ${collectionName} WHERE Id = @Id`)

        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'No data found' });
        } else {
            res.status(200).json(result.recordset);
        }
    } catch (error) {
        res.status(500).send("Error connecting to SQL Server");
        console.error(error);
    } finally {
        if (pool) {
            pool.close()
        }
    }
});


module.exports = router;
