import classes from "./header.module.scss";

export default function Header() {
  return (
    <header className={classes.header}>
      <h6 className={classes["header__title"]}>Realworld Blog</h6>
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
