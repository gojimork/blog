import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import ArticleList from "../article-list/";
import { Pagination, Spin, Alert } from "antd";

import BlogApiService from "../../blog-api-service";

const Articles = ({ page }) => {
  const [data, setData] = useState({ articles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const blogApiService = useMemo(() => new BlogApiService(), []);
  const putArticles = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * 5;
      const articleList = await blogApiService.getArticles(offset);
      setData(articleList);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, blogApiService]);

  useEffect(() => {
    putArticles();
  }, [putArticles]);

  const history = useHistory();
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Articles;
