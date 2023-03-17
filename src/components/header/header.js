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
