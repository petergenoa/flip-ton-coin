import React, { useEffect } from 'react';
import './styles/messagePopup.css';
import ButtonBackground from '../../assets/images/popups/button-background.png';
import OkButton from '../../assets/images/popups/ok-button.png';
import ButtonSound from "../../assets/sounds/button.wav";

interface MessagePopupProps {
  onClose: () => void;
  message: string;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ onClose, message }) => {
  const playSoundClose = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
    onClose();
  }

  return (
    <div className="message-overlay">
      <div className="message-popup">
        <div className='message-popup-head'>MESSAGE</div>
          <div className="message-content">
            <div>{message}</div>
          </div>
          <div className="message-buttons">
            <div className='message-popup-button' onClick={playSoundClose}>
              <img src={OkButton} alt="" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default MessagePopup;