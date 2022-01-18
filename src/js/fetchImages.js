export default class NewsImages{
    constructor() {
        this.searchQuery = ' ';
        this.page = 1;
     };
    
    fetchArticles() {
        const key = '25267969-1b21c6cce0210f4f694534b04';

        return fetch(`https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&image_type=photo&per_page=5&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
                this.page += 1;

                return data.hits
            });
    };

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

