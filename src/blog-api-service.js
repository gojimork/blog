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

  postUser = (user) => {
    const url = `${this._apiBase}/users`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  };

  userLogin = (user) => {
    const url = `${this._apiBase}/users/login`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  };

  getUser = (token) => {
    const url = `${this._apiBase}/user`;
    return fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  editProfile = (body, token) => {
    const url = `${this._apiBase}/user`;
    console.log(JSON.stringify(body));
    console.log(token);
    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
  };

  createArticle = (body, token) => {
    const url = `${this._apiBase}/articles`;
    console.log(JSON.stringify(body));
    console.log(token);
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
  };

  deleteArticle = (slug, token) => {
    const url = `${this._apiBase}/articles/${slug}`;
    console.log(slug);
    console.log(token);
    return fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  };

  likeArticle = (slug, token) => {
    const url = `${this._apiBase}/articles/${slug}/favorite`;
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  };

  disLikeArticle = (slug, token) => {
    const url = `${this._apiBase}/articles/${slug}/favorite`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  };
}
