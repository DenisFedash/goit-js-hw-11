import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const key = '25267969-1b21c6cce0210f4f694534b04';


export default class NewsImages{
    constructor() {
        this.searchQuery = ' ';
        this.page = 1;
        this.totalImages;
        this.perPage = 20;
     };
    
    async fetchArticles() {
        
        const response = await axios(`/?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`);
        const articles = await response.data;

        this.incrementPage();
        this.totalImages = articles.totalHits;

        return articles.hits;

    };

     incrementPage() {
    this.page += 1;
  }

    get query(){
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
};

