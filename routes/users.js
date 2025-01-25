const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
require('dotenv').config()

const MONGODB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get a users individual reviews
router.get('/reviews/:id', async (req, res) => {
    let client;
    try {
            client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("wm-studenthub-database"); 
            const collection = db.collection('Reviews');
            const id = req.params.id
            const document = await collection.find({userId: id}).toArray();
            res.status(200).json(document)
        } catch (error) {
            res.status(500).send("Error connecting to MongoDB");
            console.error(error);
        } finally {
            if (client) {
                await client.close();
            }
        }
})

module.exports = router;
