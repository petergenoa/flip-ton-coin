import React, { useEffect, useState } from 'react';
import './styles/depositPopup.css';
import ButtonBackground from '../../assets/images/popups/button-background.png';
import AmountBackground from '../../assets/images/popups/amount-background.png';
import TonImage from '../../assets/images/popups/small-ton-side.png';
import CancelImage from '../../assets/images/popups/cancel-button.png';
import ButtonSound from "../../assets/sounds/button.wav";
import Header from '../Header';

interface DepositPopupProps {
  amount: number;
  username: string;
  onClose: () => void;
}

const DepositPopup: React.FC<DepositPopupProps> = ({ amount, username, onClose }) => {
  const [value, setValue] = useState('');
  const playSoundClose = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    onClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Remove non-numeric characters, except for decimal point
    val = val.replace(/[^0-9.]/g, '');

    // Allow only two decimal places
    if (val.includes('.')) {
      const [integerPart, decimalPart] = val.split('.');
      if (decimalPart.length > 2) {
        val = `${integerPart}.${decimalPart.slice(0, 2)}`;
      }
    }

    // Set value within the range 1 to 1000
    const numVal = parseFloat(val);
    if (numVal < 1) {
      val = '1';
    } else if (numVal > 1000) {
      val = '1000';
    }

    setValue(val);
  };

  return (
    <div className="deposit-overlay">
        <div className='deposit-header'>
            <Header username={username} amount={amount} />
        </div>
        <div className="deposit-popup">
            <div className='deposit-popup-head'>Deposit/Withdraw</div>
            <div className="deposit-content">
                <img src={AmountBackground} alt="background" />
                <div className='deposit-amount'><img src={TonImage} alt="ton-image" /><span><input type="text" value={value} onChange={handleChange} placeholder="10.00" /></span></div>
            </div>
            <div className='deposit-cancel' onClick={playSoundClose}><img src={CancelImage} alt="cancel-image" /></div>
            <div className="deposit-buttons">
                <div className='deposit-popup-button' onClick={playSoundClose}>
                <img src={ButtonBackground} alt="" />
                <div className='deposit-button-title'>Deposit</div>
                </div>
                <div className='deposit-popup-button' onClick={playSoundClose}>
                <img src={ButtonBackground} alt="" />
                <div className='deposit-button-title'>Withdraw</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DepositPopup;