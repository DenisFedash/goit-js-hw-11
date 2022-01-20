import './sass/main.scss';
import './css/style.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import NewsImages from './js/fetchImages';
import LoadMoreBtn from './js/load-more-btn';
import cardsTemp from './templates/cards.hbs';
import getRefs from './js/get-refs';
import { scroll } from './js/scrollBy';

Notiflix.Notify.init({
    width: '380px',
    position: 'right-top',
    distance: '15px',
    opacity: 1,
    borderRadius: '5px',
    timeout: 2000,
})

const newsImages = new NewsImages();
const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({selector: '.load-more', hidden: true});

refs.searchForm.addEventListener('submit', onSearch);
refs.imgCardLink.addEventListener('click', openModalImg);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

const modalWindow = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

function onSearch(e) {
    e.preventDefault();
    
    newsImages.query = e.currentTarget.elements.searchQuery.value.trim();

    if (newsImages.query === '') {
        loadMoreBtn.hide();
        Notiflix.Notify.warning('You need to write something in form');
        return;
    };
    
    newsImages.resetPage();
    clearGalleryContainer()
    loadMoreBtn.show();
    fetchArticles();
    
    e.currentTarget.reset();
};

async function fetchArticles() {    
    try {        
        loadMoreBtn.disabled();        
        const hits = await newsImages.fetchArticles();
        countOfImages();
        const append = await appendCardsMarkup(hits);
        
         if (hits.length === 0) {
            loadMoreBtn.hide();
            Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
            );
             gallery.innerHTML = '';
            
         } else if (hits.length <= 2) {
             loadMoreBtn.hide();
        }
            modalWindow.refresh();
       

        if (hits.length < NewsImages.perPage) {
            loadMoreBtn.hide();
        }

        loadMoreBtn.enable();
        scroll();
        
    } catch (error) {}
}

async function onLoadMore() {
    loadMoreBtn.disabled();   
    const hits = await newsImages.fetchArticles();
    countOfImages();
    const append = await appendCardsMarkup(hits);
    loadMoreBtn.enable();
    
    modalWindow.refresh();
    scroll();
    
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

function countOfImages() {
  const quantityImagesOnPage = newsImages.perPage;
  const currentImages = newsImages.page * newsImages.perPage - newsImages.perPage;
  const totalImages = newsImages.totalImages;

  if (currentImages === quantityImagesOnPage && totalImages !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  }

  if (currentImages > totalImages && totalImages !== 0 && totalImages > quantityImagesOnPage) {
      loadMoreBtn.hide();
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search ${totalImages} results`);      
  }     
};