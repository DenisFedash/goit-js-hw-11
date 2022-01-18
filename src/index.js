import './sass/main.scss';
import NewsImages from './js/fetchImages'
import cardsTemp from './templates/cards.hbs'

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMore: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
};

const newsImages = new NewsImages();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    
    newsImages.query = e.currentTarget.elements.searchQuery.value;

    if (newsImages.query === '') {
        return alert('Fuck');
    };
    
    newsImages.resetPage();
    newsImages.fetchArticles().then(hits => {
        clearGalleryContainer();
        appendCardsMarkup(hits)
    });
};

function onLoadMore() {
    newsImages.fetchArticles().then(appendCardsMarkup);    
};

function appendCardsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardsTemp(hits))
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}