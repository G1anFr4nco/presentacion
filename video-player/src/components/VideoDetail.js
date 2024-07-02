import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const MONGO_API_URL = process.env.REACT_APP_MONGO_API_URL;

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`)
      .then(response => {
        setVideo(response.data.items[0]);
      })
      .catch(error => {
        console.error('Error fetching video details:', error);
      });
  }, [id]);

  const handleTagSubmit = () => {
    axios.post(`${MONGO_API_URL}/videos`, {
      videoId: id,
      type
    })
    .then(response => {
      console.log('Tag saved:', response.data);
    })
    .catch(error => {
      console.error('Error saving tag:', error);
    });
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <h1>{video.snippet.title}</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={video.snippet.title}
      ></iframe>
      <div>
        <label>
          Tipo de video:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <button onClick={handleTagSubmit}>Guardar etiqueta</button>
      </div>
    </div>
  );
};

export default VideoDetail;
