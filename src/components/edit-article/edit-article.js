import { useState, useEffect, useCallback, useMemo } from "react";
import CreateArticle from "../create-article";
import BlogApiService from "../../blog-api-service";
import { v4 as uuidv4 } from "uuid";

const EditArticle = ({ slug, cookies }) => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const blogApiService = useMemo(() => new BlogApiService(), []);

  const putArticleDetails = useCallback(
    async (slug) => {
      const articleDetails = await blogApiService.getArticleDetails(slug);
      const tagList = articleDetails.tagList.map((tag) => ({
        value: tag,
        id: uuidv4(),
      }));
      const newArticleDetails = JSON.parse(JSON.stringify(articleDetails));
      newArticleDetails.tagList = tagList;
      setDetails(newArticleDetails);
    },
    [blogApiService]
  );

  useEffect(() => {
    putArticleDetails(slug);
  }, [slug, putArticleDetails]);

  return <CreateArticle details={details} cookies={cookies} />;
};

export default EditArticle;
