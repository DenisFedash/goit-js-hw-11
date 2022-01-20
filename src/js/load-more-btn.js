// const refs = {
//     loadMoreBtn: document.querySelector('.load-more'),
//     loadMoreBtnLabel: document.querySelector('.label'),
// }
    
// const loadMoreBtn = {
//     enable() {
//         refs.loadMoreBtn.disabled = false;
//         refs.loadMoreBtnLabel.textContent = 'Load more...';
//     },
//     disable() {
//         refs.loadMoreBtn.disabled = true;
//         refs.loadMoreBtnLabel.textContent = 'Waiting...';
//     },
//     show() {
//         refs.loadMoreBtn.classList.remove('is-hidden');
//     },
//     hide() {
//         refs.loadMoreBtn.classList.add('is-hidden');
//     }
// }

// export default loadMoreBtn;





export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};

    refs.button = document.querySelector(selector);
    refs.label = document.querySelector('.label');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more...';
  }

  disabled() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Waiting...';
  }
  
    hide() {
    this.refs.button.classList.add('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }
}