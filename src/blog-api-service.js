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

  postUser = async (user) => {
    const url = `${this._apiBase}/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    const getBody = await response.json();
    console.log(response);
    console.log(getBody);
  };

  userLogin = async (user) => {
    const url = `${this._apiBase}/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    const getBody = await response.json();
    console.log(response);
    console.log(getBody);
  };
}