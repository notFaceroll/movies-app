import HttpClient from "./utils/HttpClient";

class MoviesService {
  constructor() {
    this.httpClient = new HttpClient('https://api.themoviedb.org/3/')
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
}

export default new MoviesService();
