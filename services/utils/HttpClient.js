class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.apiKey = '?api_key=4c00770e06a5046da486fdd9a5b221d8'
  }

  async makeRequest(url) {
    const response = await fetch(url);
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody.results ? responseBody.results : responseBody;
    }

    throw new Error(response);
  }

  getById(path, id) {
    const endPoint = `${this.baseUrl}${path}/${id}${this.apiKey}&language=en-US`;
    return this.makeRequest(endPoint);
  }

  get(path, page) {
    const url = `${this.baseUrl}movie/${path}${this.apiKey}&language=en-US${page ? '&page=1' : ''}`

    return this.makeRequest(url);
  }

  async look(path, fromDate, toDate) {
    const endPoint = `${this.baseUrl}${path}/movie${this.apiKey}&language=en-US&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&include_adult=false`

    return this.makeRequest(endPoint);
  }

  search(path, searchTerm) {
    const endPoint = `${this.baseUrl}${path}${this.apiKey}&query=${searchTerm}`;
    return this.makeRequest(endPoint);
  }

  discover(path, genre) {
    const endPoint = `${this.baseUrl}${path}${this.apiKey}&language=en-US&with_genres=${genre}`
    return this.makeRequest(endPoint);
  }
}

export default HttpClient;
