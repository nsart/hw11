import axios from "axios";
// import {refs} from './ref.js'

const BASE_URL = 'https://pixabay.com/api/';
//const URL = 'https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
const API_KEY = '38227779-ab07a99284f8d1e450cf6152b';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = true;

async function fetchSearch(q, per_page=40, page=1){
    const qsearch = encodeURIComponent(q);
    console.log("qsearch", qsearch);

    const sres =
    await axios.get(`${BASE_URL}`, {
        params: {
          key: API_KEY,
          q: qsearch,
          image_type: image_type,
          orientation: orientation,
          safesearch: safesearch,
          page,
          per_page,
        },
      });
    return sres.data;
    // return axios(`${BASE_URL}?key=${API_KEY}&q=${qsearch}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`)
    // .then((response) => {
    //     if (response.status != 200)
    //     {
    //         throw new Error(response.statusText)
    //     }
    //     const resp = response.data;
    //     // console.log("resp", resp);
    //     return resp;
    //})
}

export { fetchSearch };