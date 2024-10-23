import React, { useEffect, useState } from "react";
import "./styles/header.css";
import ProfileImage from "../assets/images/profile.png";
import DepositImage from "../assets/images/deposit.png";
import DepositPopup from "./partials/DepositPopup";
import ButtonSound from "../assets/sounds/button.m4a";

interface HeaderProps {
    amount: number;
    username: string;
}

const Header: React.FC<HeaderProps> = ({ amount, username }) => {
    const [isDepositPopupVisible, setIsDepositPopupVisible] = useState(false);
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
    
    const depositClicked = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
        setIsDepositPopupVisible(true);
    }

    return(
        <div className="header-row">
            <div className="profile-name">
                <img src={ProfileImage} alt="profile" />
                <div className="profile-username-text">{username}</div>
            </div>
            <div className="deposit-field">
                <div className="deposit-amount">
                    <img src={DepositImage} alt="" />
                    <div className="profile-deposit-text">{amount !== null ? amount.toString() : '0'}</div>
                </div>
                <div className="button-deposit" onClick={depositClicked}></div>
            </div>
            {isDepositPopupVisible &&
                <DepositPopup amount={amount} username={username} onClose={() => setIsDepositPopupVisible(false)} />
            }
        </div>
    )
}

export default Header;