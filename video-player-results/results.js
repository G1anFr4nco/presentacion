// results.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.get('/results', async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db('videoDB');
  const collection = db.collection('views');
  const results = await collection.find({}).sort({ views: -1 }).limit(20).toArray();
  res.send(results);
});

app.listen(5000, () => {
  console.log('Results server is running on port 5000');
});
