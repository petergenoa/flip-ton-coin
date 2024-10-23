import React from "react";
import "./styles/header.css";
import ProfileImage from "../assets/images/profile.png";
import DepositImage from "../assets/images/deposit.png";

interface HeaderProps {
    amount: number | null;
    username: string | '';
}

const Header: React.FC<HeaderProps> = ({ amount, username }) => {

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
                <div className="button-deposit"></div>
            </div>
        </div>
    )
}

export default Header;