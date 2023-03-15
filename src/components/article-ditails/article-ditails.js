import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import markdownFile from "./body.md";
import classes from "./article-ditales.module.scss";

const ArticleDitails = () => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
        console.log(text);
      });
  }, []);

  return (
    <ReactMarkdown className={classes["article-ditails"]}>
      {markdown}
    </ReactMarkdown>
  );
};

export default ArticleDitails;
