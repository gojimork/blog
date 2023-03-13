import classes from "./articles.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import ArticleList from "../article-list/";
import { Pagination, Spin, Alert } from "antd";

const Articles = ({ page }) => {
  const [data, setData] = useState({ articles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getArticles = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * 5;
      const url = `https://api.realworld.io/api/articles?limit=5&offset=${offset}`;
      const response = await fetch(url);
      const body = await response.json();
      setData(body);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const history = useHistory();
  return (
    <div className={classes["articles-wrap"]}>
      {loading ? <Spin /> : <ArticleList data={data.articles} />}
      {error ? (
        <Alert
          message={error.name}
          description={error.message}
          type="error"
          showIcon
        />
      ) : null}
      <Pagination
        current={page}
        total={data.articlesCount}
        onChange={(e) => history.replace(String(e))}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Articles;
