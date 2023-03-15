import classes from "./article-header.module.scss";
import { Avatar } from "antd";
import Like from "../like";
import Tags from "../tags";
import { format } from "date-fns";

const ArticleHeader = ({ details }) => {
  const { title, description, tagList, favoritesCount, updatedAt, author } =
    details;
  const { username, image } = author;
  return (
    <div className={classes["article-item"]}>
      <div className={classes["article-item__content"]}>
        <div className={classes["article-item__header"]}>
          <h5 className={classes["article-item__title"]}>{title}</h5>
          <Like favoritesCount={favoritesCount} />
        </div>
        <Tags tagList={tagList} />
        <article className={classes["article-item__text"]}>
          {description}
        </article>
      </div>
      <div className={classes["article-item__signature"]}>
        <div className={classes["signature"]}>
          <span className={classes["signature__name"]}>{username}</span>
          <span className={classes["signature__date"]}>
            {format(new Date(updatedAt), "LLLL d, y")}
          </span>
        </div>
        <Avatar size={46} src={image} />
      </div>
    </div>
  );
};

export default ArticleHeader;
