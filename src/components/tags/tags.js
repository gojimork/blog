import { Tag } from "antd";
import classes from "./tags.module.scss";

const Tags = () => {
  return (
    <ul className={classes["tags-list"]}>
      <li>
        <Tag>Tag1</Tag>
      </li>
      <li>
        <Tag>Tag1</Tag>
      </li>
    </ul>
  );
};

export default Tags;
