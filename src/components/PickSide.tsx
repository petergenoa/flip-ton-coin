import React, { useState } from "react";
import "./styles/pickSide.css";
import ButtonSound from "../assets/sounds/button.m4a";

interface PickSideProps {
    setSelectedSide: (side: string) => void;
}

const PickSide: React.FC<PickSideProps> = ({ setSelectedSide }) => {
    const [selectedSide, setLocalSelectedSide] = useState('');

    const playSound = () => {
        const audio = new Audio(ButtonSound);
        audio.play();
    }

    const handleTonClick = () => {
        playSound();
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
        setLocalSelectedSide('TON');
        setSelectedSide('TON');
    };
    
    const handleUtyaClick = () => {
        playSound();
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
        setLocalSelectedSide('UTYA');
        setSelectedSide('UTYA');
    };

    return(
        <div className="pick-side-button">
            <div
                className={`pick-side-ton ${selectedSide === 'TON' ? 'selected' : ''}`}
                onClick={handleTonClick}
            >
                TON
            </div>
            <div
                className={`pick-side-utya ${selectedSide === 'UTYA' ? 'selected' : ''}`}
                onClick={handleUtyaClick}
            >
                UTYA
            </div>
        </div>
    )
}

export default PickSide;