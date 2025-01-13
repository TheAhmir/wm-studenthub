const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING;

// Route to list all collection names
router.get('/', async (req, res) => {
    try {
        const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db("wm-studenthub-database"); // Make sure this matches your database name
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        await client.close();
        res.status(200).json(collectionNames);
    } catch (error) {
        res.status(500).send("Error connecting to MongoDB");
        console.error(error);
    }
});

// Route to get all data from a specific collection
router.get('/:collectionName', async (req, res) => {
    try {
        const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db("wm-studenthub-database"); // Make sure this matches your database name
        const collectionName = req.params.collectionName;
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        await client.close();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).send("Error connecting to MongoDB");
        console.error(error);
    }
});

module.exports = router;
