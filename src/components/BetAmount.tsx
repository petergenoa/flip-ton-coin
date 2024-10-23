import React, { useEffect, useState } from "react";
import TonImage from '../assets/images/small-ton.png';
import "./styles/betAmount.css";
import ButtonSound from "../assets/sounds/button.m4a";

interface BetAmountProps {
    setBetAmount: (amount: number) => void;
}

const BetAmount: React.FC<BetAmountProps> = ({ setBetAmount }) => {
    const [selectedItem, setSelectedItem] = useState<number>(0);
    let audio = new Audio(ButtonSound);

    useEffect(() => {
        // Preload the audio when the component mounts
        audio.preload = 'auto';
        audio.load();
    }, []);

    const playSound = () => {
        audio.currentTime = 0;
        audio.play();
    }

    const handleSelectItem = (amount: number) => {
        playSound();
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
        setSelectedItem(amount);
        setBetAmount(amount);
    };

    return (
        <div className="bet-row">
            <div className="bet-title">BET AMOUNT</div>
            <div className="bet-container">
                <div
                    className={`bet-item ${selectedItem === 1 ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(1)}
                >
                    <div className="bet-item-inner">
                    <img src={TonImage} alt="1 TON" />
                    <p>1 TON</p>
                    </div>
                </div>

                <div
                    className={`bet-item ${selectedItem === 2 ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(2)}
                >
                    <div className="bet-item-inner">
                        <img src={TonImage} alt="2 TON" />
                        <p>2 TON</p>
                    </div>
                </div>
                <div
                    className={`bet-item ${selectedItem === 5 ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(5)}
                >
                    <div className="bet-item-inner">
                        <img src={TonImage} alt="5 TON" />
                        <p>5 TON</p>
                    </div>
                </div>
                <div
                    className={`bet-item ${selectedItem === 10 ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(10)}
                >
                    <div className="bet-item-inner">
                        <img src={TonImage} alt="10 TON" />
                        <p>10 TON</p>
                    </div>
                </div>
            </div>
        </div>  
)}

export default BetAmount;