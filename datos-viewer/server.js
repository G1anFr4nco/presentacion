const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const Video = require('./models/Video');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/utube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    Video.find({}).exec()
        .then((videos) => {
            res.render('index', { videos });
        })
        .catch((err) => {
            res.status(500).send('Error fetching videos');
        });
});

io.on('connection', (socket) => {
    console.log('New client connected');

    Video.find({}).exec()
        .then((videos) => {
            socket.emit('initialData', videos);
        })
        .catch((err) => {
            console.error('Error fetching videos', err);
        });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));
