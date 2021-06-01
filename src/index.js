import './sass/main.scss';
import NewsApiService from './js/apiService.js';
import BtnLoadMore from './js/btnLoadMore.js';
import imageCrd from './templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-gallery'),
  //   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const btnLoadMore = new BtnLoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
btnLoadMore.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearArticleContainer();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Enter something valid');
  }

  btnLoadMore.show();
  newsApiService.resetPage();
  fetchArticles();
}

function onLoadMore() {
  fetchArticles();
  windowsScrolling();
}

function fetchArticles() {
  btnLoadMore.disable();
  newsApiService.fetchArticles().then(appendArticlesMarkup);
  btnLoadMore.enable();
}

function appendArticlesMarkup(images) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', imageCrd(images.hits));
}

function clearArticleContainer() {
  refs.articlesContainer.innerHTML = '';
}

function windowsScrolling() {
  const totalScrollHeight = document.body.clientHeight;

  setTimeout(() => {
    window.scrollTo({
      top: totalScrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, 500);
}
