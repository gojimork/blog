import { Tag } from "antd";
import classes from "./tags.module.scss";
import { v4 as uuidv4 } from "uuid";

const Tags = ({ tagList }) => {
  const tagNodes = tagList.map((tag) => {
    const id = uuidv4();
    return <li key={id}>{<Tag>{tag}</Tag>}</li>;
  });
  return <ul className={classes["tags-list"]}>{tagNodes}</ul>;
};

export default Tags;
