import classes from "./like.module.scss";
import { HeartOutlined } from "@ant-design/icons";

const Like = ({ favoritesCount }) => {
  return (
    <div className={classes.like}>
      <HeartOutlined />
      <span>{favoritesCount}</span>
    </div>
  );
};

export default Like;
