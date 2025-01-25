const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
require('dotenv').config()

const MONGODB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING

router.post('/ADD_USER', async (req, res) => {
    let client;
    try {
            client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("wm-studenthub-database"); 
            const collection = db.collection('Users');
            await collection.insertOne(req.body)
            res.status(200).json({ message: 'User added successfully', user: req.body})
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (client) {
                await client.close();
            }
        }
})

// get a users individual comments

module.exports = router;