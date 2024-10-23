import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import Header from "./components/Header";
import BetAmount from "./components/BetAmount";
import Coin from "./components/Coin";
import PickSide from "./components/PickSide";
import { useEffect, useState } from "react";
import WinPopup from "./components/partials/WinPopup";
import LosePopup from "./components/partials/LosePopup";
import MessagePopup from "./components/partials/MessagePopup";
import WinSound from "./assets/sounds/win.m4a";
import LostSound from "./assets/sounds/lost.m4a";

declare global {
  interface Window {
      Telegram:any;
      webkitAudioContext: any;
  }
}

function App() {
  const { network } = useTonConnect();
  const [username, setUsername] = useState('username12');
  const [balance, setBalance] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [selectedSide, setSelectedSide] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] = useState(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());
  const [audioWinBuffer, setAudioWinBuffer] = useState<AudioBuffer | null>(null);
  const [audioWinContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());

  if(window.Telegram) {
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.enableClosingConfirmation();
      tg.expand();
    }
  }

  useEffect(() => {
    const fetchAudio = async () => {
        const response = await fetch(LostSound);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedData);
    };

    fetchAudio();
  }, [audioContext]);
  
  const playLostSound = () => {
    if (audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  useEffect(() => {
    const fetchWinAudio = async () => {
        const response = await fetch(WinSound);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await audioWinContext.decodeAudioData(arrayBuffer);
        setAudioWinBuffer(decodedData);
    };

    fetchWinAudio();
  }, [audioWinContext]);
  
  const playWinSound = () => {
    if (audioWinBuffer) {
      const source = audioWinContext.createBufferSource();
      source.buffer = audioWinBuffer;
      source.connect(audioWinContext.destination);
      source.start(0);
    }
  };

  const handleFlip = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    if (!betAmount || !selectedSide) {
      setIsMessagePopupVisible(true);
      return;
    }

    // Close popup first to simulate draw animation
    setIsPopupVisible(false);
    // Simulate draw animation and delay
    setTimeout(() => {
      // Simulate coin flip (randomly select 'TON' or 'UTYA')
      const result = Math.random() < 0.5 ? 'TON' : 'UTYA';
      const userChoice = selectedSide === 'TON' ? 'TON' : 'UTYA';
      
      if (result === userChoice) {
        playWinSound();
        setIsWin(true);
        setBalance(balance + betAmount);
      } else {
        playLostSound();
        setIsWin(false);
        setBalance(balance - betAmount);
      }

      setIsPopupVisible(true);
    }, 500);
  };

  return (
    <div id="#root">
      <div className="App">
        <div className="Content">
          <Header amount={balance} username={username} />
          <BetAmount setBetAmount={setBetAmount} />
          <Coin />
          <PickSide setSelectedSide={setSelectedSide} />

          <div className="bet-button-container">
            <div className="bet-button" onClick={handleFlip}>FLIP</div>
          </div>

        </div>
      </div>

      {isPopupVisible && isWin === true && (
        <WinPopup amount={balance} username={username} winAmount={betAmount} onClose={() => setIsPopupVisible(false)} onRetry={() => handleFlip()} />
      )}
      {isPopupVisible && isWin === false && (
        <LosePopup amount={balance} username={username} onClose={() => setIsPopupVisible(false)} onRetry={() => handleFlip()} />
      )}
      {isMessagePopupVisible &&
        <MessagePopup amount={balance} username={username} message={"Please select a bet amount and a side (TON or UTYA)!"} onClose={() => setIsMessagePopupVisible(false)} />
      }
    </div>
  );
}

export default App;
