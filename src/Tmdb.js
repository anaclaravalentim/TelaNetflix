//Arquivo para todas as informações de requisição para o TMDB

const API_KEY = '4304b3ead272d8e72491c93d0942e3ae'; //chave para acessar API
const API_BASE = 'https://api.themoviedb.org/3'; //url base para o que se deseja, ex: lista de filmes de ação é base + ...

//Exportar json de informações necessárias, que são:
//Originais netflix, recomendados, em alta, ação, comédia, terror, romance e documentários

//Junta a URL, faz a requisição e pega/retorna o JSON 
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); //requisição para serviço externo
    const json = await req.json(); //espera a resposta e transforma e json
    return json;
}

//Cada tipo será uma consulta
export default{
    getHomeList: async () => {  //pega lista, adequa e retorna
        return[

            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`) //filtrar os "rercomendados da semana" seguindo documentação
            },
            {
                slug: 'orinals',
                title: 'Originais netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) //filtrar os "originais da netflix" seguindo documentação
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`) //filtrar os filmes "em alta" segundo a documentação
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`) //filtrar "ação" segundo a documentação
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`) //filtrar "comédia" segundo a documentação
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)//filtrar "terror" segundo a documentação
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)//filtrar "romance" segundo a documentação
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`) //filtrar "documentários" segundo a documentação
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {}; //busca mais informações da featured como gênero, pontos... para colocar na feature

        if(movieId) {
            switch(type) {
                case 'movie' : //se for um file
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv' : //se for programa de tv
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                default:
                    info = null;
                break;
            }
        }
        return info
    }
}