import React from 'react';
import "./style/footer.css"
import BoogieLogo from "./images/logos/Blogo_big1.png";
import TelegramIcon from '@mui/icons-material/Telegram';
import Link from "react-router-dom/es/Link";

const Footer = () => {
    return (
        <div className="footer-styles">
            <div>
                <h4>Ми завжди на зв'язку!</h4>
                <div className="contact-us-telegram">Потрібна допомога? Напишіть нам в
                    <a href="https://t.me/bbboogie"
                       className="telegram-link-design"> Telegram </a>
                    <a href="https://t.me/bbboogie">
                        <TelegramIcon className="telegram-icon-design"/>
                    </a></div>

            </div>
            <div className="boogie-logo">
                <img src={BoogieLogo} alt="Boogie" style={{width: "7%"}}/>
            </div>

        </div>
    );
};

export default Footer;