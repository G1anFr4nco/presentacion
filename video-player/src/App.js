// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios.get('/api/videos').then(response => {
      setVideos(response.data);
    });
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    axios.post('/api/view', { videoId: video.id });
  };

  return (
    <div className="app">
      <h1>Video Player</h1>
      <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
    </div>
  );
};

export default App;
