const express = require('express')
const router = express.Router()
const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

const MONGODB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING

router.post('/CREATE_REVIEW', async (req, res) => {
    let client;
    try {
            client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("wm-studenthub-database"); 
            const collection = db.collection('Reviews');
            await collection.insertOne(req.body)
            res.status(200).json({ message: 'Review created successfully', user: req.body})
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (client) {
                await client.close();
            }
        }
})

// Route to get filtered data from reviews by individual course
router.get('/:id', async (req, res) => {
    try {
        const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db("wm-studenthub-database"); 

        const collection = db.collection("Reviews");

        const id = req.params.id;

        const document = await collection.find({courseId: id}).toArray();
        
        await client.close();
        res.status(200).json(document);
    } catch (error) {
        res.status(500).send("Error connecting to MongoDB");
        console.error(error);
    }
});

module.exports = router;