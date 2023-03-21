import classes from "./like.module.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useMemo, useState, useCallback } from "react";
import BlogApiService from "../../blog-api-service";
import { useCookies } from "react-cookie";

const Like = ({ favoritesCount, slug }) => {
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [liked, setLiked] = useState(false);
  const [wasClick, setWasClick] = useState(false);
  const [cookeis] = useCookies();
  const blogApiService = useMemo(() => new BlogApiService(), []);
  const onLikeClick = () => {
    setWasClick(true);
  };

  const postLike = useCallback(async () => {
    console.log("postLike");
    if (liked) {
      console.log("liked", liked);
      const response = await blogApiService.likeArticle(slug, cookeis.token);
      if (response.ok) {
        const body = await blogApiService.getArticleDetails(slug);
        const newLikesCount = body.favoritesCount;
        setLikesCount(newLikesCount);
        setLiked(true);
      }
    } else {
      console.log("liked", liked);
      const response = await blogApiService.disLikeArticle(slug, cookeis.token);
      if (response.ok) {
        const body = await blogApiService.getArticleDetails(slug);
        const newLikesCount = body.favoritesCount;
        setLikesCount(newLikesCount);
        setLiked(false);
      }
    }
  }, [liked, blogApiService, slug, cookeis]);

  useEffect(() => {
    if (wasClick) {
      postLike();
      setWasClick(false);
    } else {
      console.log("useEffect() don't init");
    }
  }, [postLike, wasClick]);

  return (
    <button className={classes.like} onClick={onLikeClick}>
      {liked ? <HeartFilled /> : <HeartOutlined />}
      <span>{likesCount}</span>
    </button>
  );
};

export default Like;
