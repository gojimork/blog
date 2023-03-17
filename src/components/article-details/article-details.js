import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import classes from "./article-details.module.scss";
import ArticleHeader from "../article-header";

const ArticleDetails = ({ slug }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`).then((response) =>
      response.json().then((body) => {
        setDetails(body.article);
      })
    );
  }, [slug]);

  return (
    <div>
      <ArticleHeader details={details} />
      <ReactMarkdown className={classes["article-ditails"]}>
        {details ? details.body : null}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleDetails;
