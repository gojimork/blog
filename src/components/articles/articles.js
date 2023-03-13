import classes from "./articles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { Avatar, Pagination } from "antd";
import Like from "../like";
import Tags from "../tags";
import { useEffect, useState, useCallback } from "react";

const Articles = () => {
  const [data, setData] = useState({ articles: [] });
  const [page, setPage] = useState(1);

  const getArticles = useCallback(async () => {
    const offset = (page - 1) * 5;
    const response = await fetch(
      `https://api.realworld.io/api/articles?limit=5&offset=${offset}`
    );
    const body = await response.json();
    setData(body);
  }, [page]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const articlesList = data.articles.map(
    ({ title, description, tagList, favoritesCount, updatedAt, author }) => {
      const { username, image } = author;
      const id = uuidv4();
      return (
        <li key={id} className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>{title}</h5>
              <Like favoritesCount={favoritesCount} />
            </div>
            <Tags tagList={tagList} />
            <article className={classes["article-item__text"]}>
              {description}
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>{username}</span>
              <span className={classes["signature__date"]}>
                {format(new Date(updatedAt), "LLLL d, y")}
              </span>
            </div>
            <Avatar size={46} src={image} />
          </div>
        </li>
      );
    }
  );

  return (
    <div className={classes["articles-wrap"]}>
      <ul className={classes["article-list"]}>{articlesList}</ul>
      <Pagination
        current={page}
        total={data.articlesCount}
        onChange={(e) => setPage(e)}
      />
    </div>
  );
};

export default Articles;
