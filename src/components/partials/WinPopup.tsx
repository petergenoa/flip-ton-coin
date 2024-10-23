import React, { useEffect } from 'react';
import './styles/winPopup.css';
import ButtonBackground from '../../assets/images/popups/button-background.png';
import AmountBackground from '../../assets/images/popups/amount-background.png';
import TonImage from '../../assets/images/popups/small-ton-side.png';
import Fireworks from "react-canvas-confetti/dist/presets/explosion";
import WinSound from "../../assets/sounds/win3.wav";
import ButtonSound from "../../assets/sounds/button.wav";
import Header from '../Header';

interface WinPopupProps {
  username: string;
  amount: number;
  winAmount: number | null;
  onClose: () => void;
  onRetry: () => void;
}

const WinPopup: React.FC<WinPopupProps> = ({ username, amount, winAmount, onClose, onRetry }) => {
  useEffect(() => {
    const audio = new Audio(WinSound);
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
    <div className="overlay">
      <Fireworks autorun={{ speed: 5, duration: 1800 }} />
      <div className='popup-header'>
        <Header username={username} amount={amount} />
      </div>
      <div className="popup">
          <div className='popup-head'></div>
          <div className="content">
            <img src={AmountBackground} alt="background" />
            <div className='amount'><img src={TonImage} alt="ton-image" /><span>{winAmount !== null ? winAmount.toString() : ''}</span></div>
          </div>
          <div className="buttons">
            <div className='popup-button' onClick={playSoundClose}>
              <img src={ButtonBackground} alt="" />
              <div className='button-title'>Home</div>
            </div>
            <div className='popup-button' onClick={playSound}>
              <img src={ButtonBackground} alt="" />
              <div className='button-title'>Retry</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default WinPopup;
