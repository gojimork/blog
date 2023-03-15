import React from "react";
import classes from "./article-list.module.scss";
import { v4 as uuidv4 } from "uuid";
import ArticleHeader from "../article-header";

const ArticleList = ({ data }) => {
  const articlesList = data.map((ditales) => {
    const id = uuidv4();
    return (
      <li key={id}>
        <ArticleHeader ditales={ditales} />
      </li>
    );
  });
  return <ul className={classes["article-list"]}>{articlesList}</ul>;
};

export default ArticleList;
