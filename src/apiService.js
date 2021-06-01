const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21860649-53135a8ae00d6f2af37e532ef';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPicture() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=`;
    return fetch(`${url}${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        console.log('data', data);
        return data.hits;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(value) {
    this.searchQuery = value;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
