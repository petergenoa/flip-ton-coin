import React, { useEffect } from 'react';
import './styles/messagePopup.css';
import CancelButton from '../../assets/images/popups/cancel-button.png';
import ButtonSound from "../../assets/sounds/button.wav";
import Header from '../Header';

interface MessagePopupProps {
    username: string;
    amount: number;
    onClose: () => void;
    message: string;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ username, amount, onClose, message }) => {
  const playSoundClose = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    onClose();
  }

  return (
    <div className="message-overlay">
        <div className='message-header'>
            <Header username={username} amount={amount} />
        </div>
      <div className="message-popup">
        <div className='message-popup-head'>MESSAGE</div>
          <div className="message-content">
            <div>{message}</div>
          </div>
          <div className="message-buttons">
            <div className='message-popup-button' onClick={playSoundClose}>
              <img src={CancelButton} alt="" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default MessagePopup;