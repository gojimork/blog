import classes from "./header.module.scss";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

export default function Header({ userDetails }) {
  if (userDetails) {
    const { username } = userDetails;
    return (
      <header className={classes.header}>
        <Link to="/" className={classes["header__title"]}>
          Realworld Blog
        </Link>
        <ul className={classes["auth"]}>
          <li>
            <Link
              to="/new-article"
              className={`${classes["auth__btn"]} ${classes["auth__btn--priority"]}`}
            >
              Create article
            </Link>
          </li>
          <li>
            <Link to="/profile" className={classes.user}>
              <span>{username}</span>
              <Avatar
                size={46}
                src="https://static.productionready.io/images/smiley-cyrus.jpg"
              />
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className={`${classes["auth__btn"]} `}>
              Log Out
            </Link>
          </li>
        </ul>
      </header>
    );
  }
  return (
    <header className={classes.header}>
      <Link to="/" className={classes["header__title"]}>
        Realworld Blog
      </Link>
      <ul className={classes["auth"]}>
        <li>
          <Link to="/sign-in" className={classes["auth__btn"]}>
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/sign-up"
            className={`${classes["auth__btn"]} ${classes["auth__btn--priority"]}`}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
}
