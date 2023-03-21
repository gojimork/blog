import React, { useEffect, useState, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import classes from "./article-details.module.scss";
import ArticleHeader from "../article-header";
import BlogApiService from "../../blog-api-service";
import { useCookies } from "react-cookie";

const ArticleDetails = ({ slug, success }) => {
  const [details, setDetails] = useState(null);
  const [cookies] = useCookies();
  const { token } = cookies;

  const blogApiService = useMemo(() => new BlogApiService(), []);

  const putArticleDetails = useCallback(
    async (slug) => {
      const articleDetails = await blogApiService.getArticleDetails(slug);
      setDetails(articleDetails);
    },
    [blogApiService]
  );

  useEffect(() => {
    putArticleDetails(slug);
  }, [slug, putArticleDetails]);

  return (
    <div>
      <ArticleHeader details={details} token={token} success={success} />
      <ReactMarkdown className={classes["article-ditails"]}>
        {details ? details.body : null}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleDetails;
