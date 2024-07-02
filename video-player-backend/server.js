// server.js
const express = require('express');
const axios = require('axios');
const amqp = require('amqplib/callback_api');

const app = express();
app.use(express.json());

app.get('/api/videos', async (req, res) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 10,
      key: 'AIzaSyA-cnjkstrwbJ_UBZYFdC4U0PReWJiubho'
    }
  });
  res.send(response.data.items);
});

app.post('/api/view', (req, res) => {
  const videoId = req.body.videoId;
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'video_views';
      const msg = JSON.stringify({ videoId });

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  });
  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
