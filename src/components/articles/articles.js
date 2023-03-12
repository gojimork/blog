import classes from "./articles.module.scss";

import Like from "../like";

const Articles = () => {
  return (
    <div className={classes["articles-wrap"]}>
      <ul className={classes["article-list"]}>
        <li className={classes["article-item"]}>
          <div>
            <div>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <ul>
              <li>
                <teg></teg>
              </li>
            </ul>
            <article></article>
          </div>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default Articles;
