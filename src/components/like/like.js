import classes from "./like.module.scss";
import { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Like = () => {
  const [count, setCount] = useState(12);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      setLiked(true);
      setCount(count + 1);
    } else {
      setLiked(false);
      setCount(count - 1);
    }
  };

  return (
    <div className={classes.like}>
      <button onClick={handleLikeClick}>
        {liked ? <HeartFilled /> : <HeartOutlined />}
      </button>
      <span>{count}</span>
    </div>
  );
};

export default Like;
