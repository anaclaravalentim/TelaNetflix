import React from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

//Coloca a logo da netflix e o ícone de usuário
//Define quando ficará preto com "black ? 'black' : ''"
export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}> 
            <div className="header--logo">
                <a href="/">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png' alt='Netflix' />                
                </a>
                
                <div className="header--nomes">
                    <p>Início</p>
                    <p>Séries</p>
                    <p>Filmes</p>
                    <p>Bombando</p>
                    <p>Minha lista</p>
                </div>
            </div>

            <div className="header--icone1"><SearchIcon style={{fontSize: 30}} /></div>
            <div className="header--icone2"><NotificationsNoneIcon style={{fontSize: 30}} /></div>
           
            <div className="header--user">
                <a href="/">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Usuário' />                
                </a>
            </div>
        </header>
    );
}