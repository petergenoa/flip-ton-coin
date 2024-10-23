import React, { useEffect } from 'react';
import './styles/losePopup.css';
import ButtonBackground from '../../assets/images/popups/button-background.png';
import AmountBackground from '../../assets/images/popups/amount-background.png';
import TonImage from '../../assets/images/popups/small-ton-side.png';
import Fireworks from "react-canvas-confetti/dist/presets/snow";
import LostSound from "../../assets/sounds/lost.wav";
import ButtonSound from "../../assets/sounds/button.wav";
import Header from '../Header';

interface LosePopupProps {
  amount: number;
  username: string;
  onClose: () => void;
  onRetry: () => void;
}

const LosePopup: React.FC<LosePopupProps> = ({ amount, username, onClose, onRetry }) => {
  useEffect(() => {
    const audio = new Audio(LostSound);
    audio.play();
  }, []);
  
  const playSound = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
    onRetry();
  }

  const playSoundClose = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
    onClose();
  }

  return (
    <div className="lose-overlay">
      <div className='lose-header'>
        <Header username={username} amount={amount} />
      </div>
      <Fireworks autorun={{ speed: 50, duration: 3000 }} />
      <div className="lose-popup">
          <div className='lose-popup-head'></div>
          <div className="lose-content">
            <img src={AmountBackground} alt="background" />
            <div className='lose-amount'><img src={TonImage} alt="ton-image" /><span>0</span></div>
          </div>
          <div className="lose-buttons">
            <div className='lose-popup-button' onClick={playSoundClose}>
              <img src={ButtonBackground} alt="" />
              <div className='lose-button-title'>Home</div>
            </div>
            <div className='lose-popup-button' onClick={playSound}>
              <img src={ButtonBackground} alt="" />
              <div className='lose-button-title'>Retry</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LosePopup;
