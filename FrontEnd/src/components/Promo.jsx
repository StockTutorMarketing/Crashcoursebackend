import React, { useState } from 'react';
import promo from '../Data/promo.mp4';

const Promo = () => {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div>
      <video
        autoPlay
        loop
        muted={muted}
        onClick={toggleMute}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={promo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Promo;
