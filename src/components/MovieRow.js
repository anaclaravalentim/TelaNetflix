import React, { useState } from "react";
import './MovieRow.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { width } from "@mui/system";

//mostra o título e se existir filme na lista, a lista
//estrutura de listas
export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0); /* Inicia alinhado com título*/

    const handleLeftArrow = () =>{ //esquerda
        //quantidade que se move que mando pro scroll x
        let x = scrollX + Math.round(window.innerWidth / 2) //passa metade da tela do usuário
        if(x > 0){ //se chegou no fim da lista parar
            x = 0
        }
        setScrollX(x)
    }

    const handleRightArrow = () => { //direita
        //limite = quantidade de itens comparada a tela do usuário
        let x = scrollX - Math.round(window.innerWidth / 2); //passa metade da tela do usuário
        let listW = items.results.length * 150; //largura da lista
        if((window.innerHeight - listW) > x) { //tela - lista, se maior que total, voltar um pouco
            x = (window.innerWidth - listW) - 60; //60 de padding
        }
        
        setScrollX(x)
    }

    //Mostra as setas direita e esquerda com o movieRow--left e movieRow--right
    //Define as margens e quantidade que será o scroll da lista com o movieRow--list
    //Mostra as listas com movieRow--item
    return (
        <div className="movieRow">
            <h2> {title} </h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <ArrowBackIosIcon style={{fontSize: 30}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <ArrowForwardIosIcon style={{fontSize: 30}} />
            </div>

            <div className="movieRow--listarea"> 
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


