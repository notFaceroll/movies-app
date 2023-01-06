class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.apiKey = '?api_key=4c00770e06a5046da486fdd9a5b221d8'
  }

  async get(path, page) {
    const response = await fetch(
      `${this.baseUrl}movie/${path}${this.apiKey}&language=en-US${page ? '&page=1' : ''}`
    );
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody.results;
    }

    throw new Error(response);
  }

  async look(path, fromDate, toDate) {
    const response = await fetch(
      `${this.baseUrl}${path}/movie${this.apiKey}&language=en-US&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&include_adult=false`
    );
    const responseBody = await response.json();
    return responseBody.results;
  }

  async search(path, searchTerm) {
    const response = await fetch(
      `${this.baseUrl}${path}${this.apiKey}/&query=${searchTerm}`
    );
    const responseBody = await response.json();
    return responseBody;
  }
}

export default HttpClient;
