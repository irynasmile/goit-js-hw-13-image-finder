const API_KEY = '21360296-edb964443dfefac837fe5b29b';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data;
      })
      .catch(error => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}