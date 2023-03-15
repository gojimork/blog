import React from "react";
import classes from "./article-list.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import ArticleHeader from "../article-header";

const ArticleList = ({ data }) => {
  const articlesList = data.map((details) => {
    const id = uuidv4();
    return (
      <li key={id}>
        <Link to={`/article/${details.slug}`}>
          <ArticleHeader details={details} />
        </Link>
      </li>
    );
  });
  return <ul className={classes["article-list"]}>{articlesList}</ul>;
};

export default ArticleList;
