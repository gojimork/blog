import classes from "./articles.module.scss";

import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import ArticleList from "../article-list/";
import { Pagination } from "antd";

const Articles = ({ page }) => {
  const history = useHistory();
  const [data, setData] = useState({ articles: [] });
  // const [loading, setLoading] = useState(true);

  const getArticles = useCallback(async () => {
    const offset = (page - 1) * 5;
    const url = `https://api.realworld.io/api/articles?limit=5&offset=${offset}`;
    const response = await fetch(url);
    const body = await response.json();
    setData(body);
  }, [page]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <div className={classes["articles-wrap"]}>
      <ArticleList data={data.articles} />
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
