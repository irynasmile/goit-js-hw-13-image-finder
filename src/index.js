import './sass/main.scss';
import galleryTmp from './templates/gallery.hbs';
// import debounce from 'lodash.debounce';
import ApiService from './apiService';
const apiService = new ApiService();
console.log('ApiService :>> ', apiService);
// const debounce = require('lodash.debounce');
// const Handlebars = require('handlebars');
// const template = Handlebars.compile('Name: {{name}}');
// console.log(template({ name: 'Nils' }));

const refs = {
  input: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more-btn'),
};

function updateImagesMarkup(hits) {
  const markup = galleryTmp(hits);
  console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.input.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;

  apiService.query = form.elements.query.value;
  refs.gallery.innerHTML = '';
  form.reset();

  apiService.resetPage();
  apiService.fetchPicture().then(hits => {
    updateImagesMarkup(hits);
  });
});

refs.btnLoad.addEventListener('click', () => {
  apiService.fetchPicture().then(updateImagesMarkup);
});
