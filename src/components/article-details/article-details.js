import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import markdownFile from "./body.md";
import classes from "./article-details.module.scss";
import ArticleHeader from "../article-header";

const ArticleDetails = ({ slug }) => {
  const [markdown, setMarkdown] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`).then((response) =>
      response.json().then((body) => {
        setDetails(body.article);
      })
    );
  }, [slug]);

  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, []);

  return (
    <div>
      <ArticleHeader details={details} />
      <ReactMarkdown className={classes["article-ditails"]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleDetails;
