import './sass/main.scss';
// import fetchImg from './apiService.js';
import ApiService from './apiService';
const ApiService = new ApiService();
console.log('apiService :>> ', ApiService);
import imageCardTpl from './templates/pic_card.hbs';
// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));

import debounce from 'lodash.debounce';
const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more-btn'),
  el: document.querySelector('.special'),
};

// export default function fetchImg(queryImg, page) {
//   return fetch(`${BASE_URL}?key=${API_KEY}&q=${queryImg}&page=${page}&per_page=12`).then(
//     response => {
//       if (!response.ok) {
//         alert('Bad Request!!!');
//         throw new Error('Bad Request!!!');
//       } else {
//         console.log('response 1:', response);
//         return response.json();
//       }
//     },
//   );
// }
// const apiKey = '21739365-699704d85d2e3a75a32a4de8c';
//

// let btn = document.querySelector('.btn');

// btn.addEventListener('click', function () {
//   refs.el.scrollIntoView({
//     top: document.documentElement.scrollHeight,
//     behavior: 'smooth',
//     block: 'end',
//   });
// });
// console.log(document.documentElement.scrollHeight);

// refs.load.addEventListener('input', debounce(onSearch, 1000));
refs.searchForm.addEventListener(
  'input',
  debounce(() => {
    let queryImg = refs.load.value;
    // console.log('queryImg', queryImg);
    if (!queryImg) return;
    fetchCountries(queryImg)
      .then(galleryMarkup)
      .catch(console.error())
      .finally(() => (refs.load.value = ''));
  }, 500),
);

// function galleryMarkup(data) {
//   console.log('data :', data);
//   refs.gallery.insertAdjacentHTML('beforeend', imageCardTpl(data));
// }
// refs.searchForm.addEventListener('submit', onSearch);
refs.load.addEventListener('click', onLoad);

const galleryMarkup = item => {
  refs.gallery.insertAdjacentHTML('beforeend', imageCardTpl(item));
  refs.gallery.innerHTML = imageCardTpl(data);
};

let page = 1;
let queryImg = '';

function onSearch(event) {
  console.log('123');

  event.preventDefault();
  queryImg = event.currentarget.elements.query.value;
  page = 1;
  gallery.innerHTML = '';

  setImg();
}

function setImg(shouldScroll = false) {
  refs.load.disabled = true;
  fetchImg(queryImg, page).then(data => {
    refs.load.classList.remove('hidden');
    galleryMarkup(data.hits);
    if (shouldScroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    if (data.hits.length < 12) {
      load.classList.add('hidden');
    }
    refs.load.disabled = false;
  });
}

function onLoad() {
  page += 1;
  setImg(true);
}
