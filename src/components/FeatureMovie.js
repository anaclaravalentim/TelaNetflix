import React from "react";
import './FeatureMovie.css';

export default ({item}) => {

    let ponto = item.vote_average //Pontuação estava vindo 8.95565, coloquei em variável para usar o toFixed(1) e deixar 8.9
    let firstDate = new Date(item.first_air_date); //Altera valores de data bugadas vindas do array
    let genres = []; //Percorre os gêneros
    for(let i in item.genres) {
        genres.push(item.genres[i].name); //Guarda genero no array para mostrar na feature
    }

    let description = item.overview;
    if(description.length > 180){
        description = description.substring(0,180) + '...';
    } //Corta descrição muito grande

    //Traz a imagem principal com featured
    //Alinha no css o efeito escuro com featured--vertical e featured--horizontal
    //Traz todas as informações da imagem principal exibida com featured--name,featured--info...
    return(
       <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
       }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name} </div>
                    <div className="featured--info">
                        <div className="featured--points">{ponto.toFixed(1)} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className='featured--watchbutton'>► Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured--mylistbutton'>+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
       </section>
    )
}

