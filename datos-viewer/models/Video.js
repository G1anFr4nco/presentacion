const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    viewTime: { type: Number, default: 0 }
});

module.exports = mongoose.model('Video', videoSchema);
