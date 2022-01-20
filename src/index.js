import './sass/main.scss';
import NewsImages from './js/fetchImages';
import cardsTemp from './templates/cards.hbs';
import Notiflix from 'notiflix';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
    imgCardLink: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({selector: '.load-more', hidden: true});
const newsImages = new NewsImages();

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.imgCardLink.addEventListener('click', openModalImg);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
console.log(loadMoreBtn)
function onSearch(e) {
    e.preventDefault();
    
    newsImages.query = e.currentTarget.elements.searchQuery.value.trim();
    loadMoreBtn.hide();

    if (newsImages.query === '') {
        
        Notiflix.Notify.warning('You need to write something in form');
        return;
    };
    
    newsImages.resetPage();
    clearGalleryContainer()
    fetchArticles();
};

async function fetchArticles() {
    
     try {
        const hits = await newsImages.fetchArticles();
        const append = await appendCardsMarkup(hits);
     
         if (hits.length === 0) {
            loadMoreBtn.hide();
            Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
            );
            gallery.innerHTML = '';
        };

        if (hits.length < NewsImages.perPage) {
            
        }
    } catch (error) {
        
    }
}

async function onLoadMore() {
   loadMoreBtn.disabled();   
    const hits = await newsImages.fetchArticles();
    const append = await appendCardsMarkup(hits);    
};

function appendCardsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardsTemp(hits))
};

function openModalImg(e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery_item')) {
        return;
    };
};

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
};