import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}`)
      .then(response => {
        setVideos(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });

    axios.get(`${process.env.REACT_APP_MONGO_API_URL}/recommended`)
      .then(response => {
        setRecommendedVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching recommended videos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Videos</h1>
      <div>
        {videos.map(video => (
          <div key={video.id.videoId}>
            <Link to={`/video/${video.id.videoId}`}>
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              <h3>{video.snippet.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <h2>Recomendados</h2>
      <div>
        {recommendedVideos.map(video => (
          <div key={video.videoId}>
            <Link to={`/video/${video.videoId}`}>
              <h3>{video.videoId}</h3>
              <p>Tipo: {video.type}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
