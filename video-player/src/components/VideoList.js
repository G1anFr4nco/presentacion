// src/components/VideoList.js
import React from 'react';

const VideoList = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <div key={video.id} onClick={() => onVideoSelect(video)}>
          <img src={video.thumbnail} alt={video.title} />
          <h3>{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
