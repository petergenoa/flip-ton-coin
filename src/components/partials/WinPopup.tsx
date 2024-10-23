import React, { useEffect, useState } from 'react';
import './styles/winPopup.css';
import ButtonBackground from '../../assets/images/popups/button-background.png';
import AmountBackground from '../../assets/images/popups/amount-background.png';
import TonImage from '../../assets/images/popups/small-ton-side.png';
import Fireworks from "react-canvas-confetti/dist/presets/explosion";
import ButtonSound from "../../assets/sounds/button.m4a";
import Header from '../Header';

interface WinPopupProps {
  username: string;
  amount: number;
  winAmount: number | null;
  onClose: () => void;
  onRetry: () => void;
}

const WinPopup: React.FC<WinPopupProps> = ({ username, amount, winAmount, onClose, onRetry }) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());

  useEffect(() => {
    const fetchAudio = async () => {
        const response = await fetch(ButtonSound);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedData);
    };

    fetchAudio();
  }, [audioContext]);
  
  const playSound = () => {
    if (audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  const playSoundRetry = () => {
    playSound();
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    onRetry();
  }

  const playSoundClose = () => {
    playSound();
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
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
            <div className='popup-button' onClick={playSoundRetry}>
              <img src={ButtonBackground} alt="" />
              <div className='button-title'>Retry</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default WinPopup;
