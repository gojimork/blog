import classes from "./article-header.module.scss";
import { Avatar, Popconfirm } from "antd";
import Like from "../like";
import Tags from "../tags";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import BlogApiService from "../../blog-api-service";

const ArticleHeader = ({ details, token, success }) => {
  const blogApiService = new BlogApiService();
  const history = useHistory();

  if (!details) return;

  const {
    title,
    description,
    tagList,
    favoritesCount,
    updatedAt,
    author,
    slug,
  } = details;

  const { username, image } = author;

  const onDeleteClick = async () => {
    try {
      const response = await blogApiService.deleteArticle(slug, token);
      if (response.ok) {
        success();
        history.push("/");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={classes["article-item"]}>
      <div className={classes["article-item__content"]}>
        <div className={classes["article-item__header"]}>
          <h5 className={classes["article-item__title"]}>{title}</h5>
          <Like favoritesCount={favoritesCount} slug={slug} />
        </div>
        <Tags tagList={tagList} />
        <article className={classes["article-item__text"]}>
          {description}
        </article>
      </div>
      <div className={classes["article-item__interface"]}>
        <div className={classes["article-item__signature"]}>
          <div className={classes["signature"]}>
            <span className={classes["signature__name"]}>{username}</span>
            <span className={classes["signature__date"]}>
              {format(new Date(updatedAt), "LLLL d, y")}
            </span>
          </div>
          <Avatar size={46} src={image} />
        </div>
        {token && (
          <ul className={classes["control-btns"]}>
            <li>
              <button
                className={classes["edit-btn"]}
                onClick={() => history.push(`/articles/${slug}/edit`)}
              >
                Edit
              </button>
            </li>
            <li>
              <Popconfirm
                title="Delete?"
                okText="Yes"
                cancelText="No"
                onConfirm={onDeleteClick}
              >
                <button className={classes["delete-btn"]}>Delete</button>
              </Popconfirm>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArticleHeader;
