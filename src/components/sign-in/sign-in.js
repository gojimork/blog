import { Link } from "react-router-dom";
import classes from "./sign-in.module.scss";

const SignIn = () => {
  return (
    <form className={classes["sing-in"]}>
      <h2 className={classes["sing-in__title"]}>Sign In</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            required
          />
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" placeholder="Password" required />
        </li>
      </ul>

      <button className={classes["submit-btn"]} type="submit">
        Create
      </button>
      <span className={classes.question}>
        Don’t have an account?{" "}
        <Link className={classes.link} to="/sign-up">
          Sign Up.
        </Link>
      </span>
    </form>
  );
};

export default SignIn;
