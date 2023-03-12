import classes from "./articles.module.scss";

import { Avatar, Pagination } from "antd";
import Like from "../like";
import Tags from "../tags";

const Articles = () => {
  return (
    <div className={classes["articles-wrap"]}>
      <ul className={classes["article-list"]}>
        <li className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <Tags />
            <article className={classes["article-item__text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>John Doe</span>
              <span className={classes["signature__date"]}>March 5, 2020 </span>
            </div>
            <Avatar
              size={46}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </li>
        <li className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <Tags />
            <article className={classes["article-item__text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>John Doe</span>
              <span className={classes["signature__date"]}>March 5, 2020 </span>
            </div>
            <Avatar
              size={46}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </li>
        <li className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <Tags />
            <article className={classes["article-item__text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>John Doe</span>
              <span className={classes["signature__date"]}>March 5, 2020 </span>
            </div>
            <Avatar
              size={46}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </li>
        <li className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <Tags />
            <article className={classes["article-item__text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>John Doe</span>
              <span className={classes["signature__date"]}>March 5, 2020 </span>
            </div>
            <Avatar
              size={46}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </li>
        <li className={classes["article-item"]}>
          <div className={classes["article-item__content"]}>
            <div className={classes["article-item__header"]}>
              <h5 className={classes["article-item__title"]}>
                Some article title
              </h5>
              <Like />
            </div>
            <Tags />
            <article className={classes["article-item__text"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </article>
          </div>
          <div className={classes["article-item__signature"]}>
            <div className={classes["signature"]}>
              <span className={classes["signature__name"]}>John Doe</span>
              <span className={classes["signature__date"]}>March 5, 2020 </span>
            </div>
            <Avatar
              size={46}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </li>
      </ul>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default Articles;
