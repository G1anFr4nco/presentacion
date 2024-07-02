// worker.js
const amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = 'video_views';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(queue, async (msg) => {
      const videoView = JSON.parse(msg.content.toString());
      const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db('videoDB');
      const collection = db.collection('views');
      await collection.updateOne({ videoId: videoView.videoId }, { $inc: { views: 1 } }, { upsert: true });
      console.log(" [x] Processed %s", msg.content.toString());
    }, {
      noAck: true
    });
  });
});
