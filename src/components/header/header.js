import classes from "./header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes["header__title"]}>
        Realworld Blog
      </Link>
      <ul className={classes["auth"]}>
        <li>
          <button className={classes["auth__btn"]}>Sign In</button>
        </li>
        <li>
          <button
            className={`${classes["auth__btn"]} ${classes["auth__btn--priority"]}`}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </header>
  );
}
