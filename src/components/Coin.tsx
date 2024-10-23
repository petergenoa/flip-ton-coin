import React from "react";
import UtyaCoin from '../assets/images/coin/utya.png';
import TonCoin from '../assets/images/coin/ton.png';

const Coin = () => {

    return(
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
    )
}

export default Coin;