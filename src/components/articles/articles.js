import classes from "./articles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Avatar, Pagination } from "antd";
import Like from "../like";
import Tags from "../tags";

const Articles = ({ page }) => {
  const [data, setData] = useState({ articles: [] });

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

  const history = useHistory();

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
        current={Number(page)}
        total={data.articlesCount}
        onChange={(e) => history.push(`${e}`)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Articles;
