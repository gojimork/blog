import classes from "./article-header.module.scss";
import { Avatar, Popconfirm } from "antd";
import Like from "../like";
import Tags from "../tags";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import BlogApiService from "../../blog-api-service";
import { useCookies } from "react-cookie";

const ArticleHeader = ({ details }) => {
  const blogApiService = new BlogApiService();
  const history = useHistory();
  const [cookies] = useCookies();
  const token = cookies.token;
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
              onConfirm={() => {
                blogApiService.deleteArticle(slug, token).then(console.log);
                history.push("/");
              }}
              onCancel={() => console.log("delete canceled")}
            >
              <button className={classes["delete-btn"]}>Delete</button>
            </Popconfirm>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArticleHeader;
