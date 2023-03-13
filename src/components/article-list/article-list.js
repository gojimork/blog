import classes from "./article-list.module.scss";
import { Avatar } from "antd";
import Like from "../like";
import Tags from "../tags";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const ArticleList = ({ data }) => {
  const articlesList = data.map(
    ({ title, description, tagList, favoritesCount, updatedAt, author }) => {
      const { username, image } = author;
      const id = uuidv4();
      return (
        <li key={id} className={classes["article-item"]}>
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
        </li>
      );
    }
  );
  return <ul className={classes["article-list"]}>{articlesList}</ul>;
};

export default ArticleList;
