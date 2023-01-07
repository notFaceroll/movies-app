import HttpClient from "./utils/HttpClient";

class MoviesService {
  constructor() {
    this.httpClient = new HttpClient('https://api.themoviedb.org/3/')
  }
  getById(id) {
    return this.httpClient.getById('movie', id);
  }

  getTopRated() {
    return this.httpClient.get('top_rated', true);
  }

  getUpcoming() {
    return this.httpClient.get('upcoming', true);
  }

  getLatest() {
    return this.httpClient.get('now_playing', true);
  }

  getFromDate(from, to) {
    return this.httpClient.look('discover', from, to)
  }

  searchMovie(searchTerm) {
    return this.httpClient.search('search/multi', searchTerm);
  }

  discover(genre) {
    return this.httpClient.discover('discover/movie', genre);
  }
}

export default new MoviesService();
