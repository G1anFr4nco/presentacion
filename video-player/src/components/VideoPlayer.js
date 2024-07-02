// src/components/VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ video }) => {
  return (
    <div className="video-player">
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
    </div>
  );
};

export default VideoPlayer;
