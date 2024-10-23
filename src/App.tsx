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
import { useState } from "react";
import WinPopup from "./components/partials/WinPopup";
import LosePopup from "./components/partials/LosePopup";
import ButtonSound from "./assets/sounds/button.wav";
import MessagePopup from "./components/partials/MessagePopup";

function App() {
  const { network } = useTonConnect();
  const [username, setUsername] = useState('username12');
  const [balance, setBalance] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [selectedSide, setSelectedSide] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] = useState(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  
  const playSound = () => {
    const audio = new Audio(ButtonSound);
    audio.play();
  }
  
  const handleFlip = () => {
    playSound();
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
        // User wins
        setIsWin(true);
        setBalance(balance + betAmount);
      } else {
        // User loses
        setIsWin(false);
        setBalance(balance - betAmount);
      }

      // Show the popup after the "draw animation"
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
