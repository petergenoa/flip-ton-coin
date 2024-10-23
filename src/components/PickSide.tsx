import React, { useState } from "react";
import "./styles/pickSide.css";
import ButtonSound from "../assets/sounds/button.wav";

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
        setLocalSelectedSide('TON');
        setSelectedSide('TON');
        playSound();
    };
    
    const handleUtyaClick = () => {
        setLocalSelectedSide('UTYA');
        setSelectedSide('UTYA');
        playSound();
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