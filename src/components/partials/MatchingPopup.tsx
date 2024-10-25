import React, { useEffect, useState } from 'react';
import './styles/matchingPopup.css';

const MessagePopup = () => {

  return (
    <div className="matching-overlay">
      <div className="matching-popup">
        <div className='matching-popup-text'>Matching...</div>
      </div>
    </div>
  );
};

export default MessagePopup;