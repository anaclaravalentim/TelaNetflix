import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";


export default () =>{
  
  const [movieList, setMovieList] = useState([]); //Inicia com array (lista de filmes) vazio
  const [featureData, setFeatureData] = useState(null); //Inicia sem as infos para featured
  const [blackHeader, setBlackHeader] = useState(false); /* Começa com falso (transparente) */

  //Quando a tela carregar, trazer lista de dados da API
  useEffect(() =>{
    const loadAll = async () =>{
       //Pegando a lista total que retorna array com tipos
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando a Feature dos originais netflix
      let originals = list.filter(i=>i.slug === 'orinals'); /* pega os originais pois tem mais informações */
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); //gera número aleatório dentro da qtde da lista
      let chosen = originals[0].items.results[randomChosen]; /* Pega o escolhido */
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv'); /* Busca mais informações do escolhido */
      setFeatureData(chosenInfo); /* Seta tudo */
    }

    loadAll(); //Carrega tudo
  }, []);

    //Monitoramento da página para o header 
    useEffect(() => {
      const scrollListner = () => {
          if(window.scrollY > 10){  //quando o scroll da vertical for maior que 10
            setBlackHeader(true); //seta o black
          } else {
            setBlackHeader(false); //deixa transparente
          }
      }
      window.addEventListener('scroll', scrollListner); //quando tiver evento de rolagem, aciona função
      return () =>{
        window.removeEventListener('scroll',scrollListner) //encerra evento ao sair
      }
    }, []);

  //Chamada carregar todas as informações em sequencia 
  //Cabeçalho (Header)
  //Foto com informações (Feature)
  //Lista de filmes por gênero (MovieRow)
  //Rodapé (footer)
  //Loading (carrega igual a netflix caso a lista de filmes não tenha nada ou esteja carregando)
  return(
    <div className="page"> 

      <Header black={blackHeader} /> 

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
          Desenvolvido por Ana Clara Valentim<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org<br/>
      </footer>
      
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
      </div>
      }
    
      
    </div>
  );
}