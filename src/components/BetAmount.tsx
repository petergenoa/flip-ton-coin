import React, { useState } from "react";
import TonImage from '../assets/images/small-ton.png';
import "./styles/betAmount.css";
import ButtonSound from "../assets/sounds/button.wav";

interface BetAmountProps {
    setBetAmount: (amount: number) => void;
}

const BetAmount: React.FC<BetAmountProps> = ({ setBetAmount }) => {
    const [selectedItem, setSelectedItem] = useState<number>(0);

    const playSound = () => {
        const audio = new Audio(ButtonSound);
        audio.play();
    }

    const handleSelectItem = (amount: number) => {
        setSelectedItem(amount);
        setBetAmount(amount);
        playSound();
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