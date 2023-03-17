export default class BlogApiService {
  _apiBase = "https://blog.kata.academy/api";
  getArticles = async (offset) => {
    const url = `${this._apiBase}/articles?limit=5&offset=${offset}`;
    const response = await fetch(url);
    return response.json();
  };

  getArticleDetails = async (slug) => {
    const url = `${this._apiBase}/articles/${slug}`;
    const response = await fetch(url);
    const body = await response.json();
    return body.article;
  };
}
