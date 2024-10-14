import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import TonImage from './assets/images/small-ton.png';
import UtyaCoin from './assets/images/coin/utya.png';
import TonCoin from './assets/images/coin/ton.png';


function App() {
  const { network } = useTonConnect();

  return (
    <div id="#root">
      <div className="App">
        <div className="Content">
          <div className="header-row">
            <div className="profile-name">
              <div className="profile-username-text">Username</div>
            </div>
            <div className="deposit-field">
              <div className="profile-deposit-text">
                18
              </div>
              <div className="button-deposit"></div>
            </div>
          </div>

          <div className="bet-row">
            <div className="bet-title">BET AMOUNT</div>
            <div className="bet-container">
              <div className="bet-item">
                <div className="bet-item-inner">
                  <img src={TonImage} alt="" />
                  <p>1 TON</p>
                </div>
              </div>
              <div className="bet-item">
                <div className="bet-item-inner">
                  <img src={TonImage} alt="" />
                  <p>2 TON</p>
                </div>
              </div>
              <div className="bet-item">
                <div className="bet-item-inner">
                  <img src={TonImage} alt="" />
                  <p>5 TON</p>
                </div>
              </div>
              <div className="bet-item">
                <div className="bet-item-inner">
                  <img src={TonImage} alt="" />
                  <p>10 TON</p>
                </div>
              </div>
            </div>
          </div>

          <div className="coin-container">
            <div className="coin">
              <div className="coin-face front">
                <img src={UtyaCoin} alt="UtyaCoin" />
              </div>
              <div className="coin-face back">
                <img src={TonCoin} alt="TonCoin" />
              </div>
            </div>
          </div>

          <div className="pick-side-button">
            <div className="pick-side-ton">TON</div>
            <div className="pick-side-utya">UTYA</div>
          </div>

          <div className="bet-button-container">
            <div className="bet-button">FLIP</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
