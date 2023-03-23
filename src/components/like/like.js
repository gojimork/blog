import classes from "./like.module.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useMemo, useState, useCallback } from "react";
import BlogApiService from "../../blog-api-service";
import { useCookies } from "react-cookie";

const Like = ({ favoritesCount, slug }) => {
  const [cookies, setCookie] = useCookies();
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLiked, setIsLiked] = useState(cookies[slug]);
  const [wasClick, setWasClick] = useState(false);

  const blogApiService = useMemo(() => new BlogApiService(), []);

  const onLikeClick = () => {
    if (cookies.token) {
      setWasClick(!wasClick);
    } else {
      console.log("need auth");
    }
  };
  const postLike = useCallback(async () => {
    if (!isLiked) {
      const response = await blogApiService.likeArticle(slug, cookies.token);
      if (response.ok) {
        const body = await response.json();
        const { article } = body;
        setLikesCount(article.favoritesCount);
        setIsLiked(true);
        setCookie(slug, "isLiked");
      }
    } else {
      const response = await blogApiService.disLikeArticle(slug, cookies.token);
      if (response.ok) {
        const body = await response.json();
        const { article } = body;
        setLikesCount(article.favoritesCount);
        setIsLiked(false);
        setCookie(slug, "");
      }
    }
  }, [isLiked, blogApiService, slug, cookies, setCookie]);

  useEffect(() => {
    if (wasClick) {
      postLike();
      setWasClick(false);
    }
  }, [postLike, wasClick]);

  return (
    <button className={classes.like} onClick={onLikeClick}>
      {isLiked ? <HeartFilled /> : <HeartOutlined />}
      <span>{likesCount}</span>
    </button>
  );
};

export default Like;
