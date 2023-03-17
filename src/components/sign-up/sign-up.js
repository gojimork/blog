import { Link } from "react-router-dom";
import classes from "./sign-up.module.scss";

const SignUp = () => {
  return (
    <form className={classes["sing-up"]}>
      <h2 className={classes["sing-up__title"]}>Create new account</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="name">Username</label>
          <input type="text" name="name" placeholder="Username" required />
        </li>
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
        <li className={classes["input-item"]}>
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="text"
            name="repeat-password"
            placeholder="Password"
            required
          />
        </li>
      </ul>
      <div className={classes.agreement}>
        <input type="checkbox" checked />
        <label>I agree to the processing of my personal information</label>
      </div>

      <button className={classes["submit-btn"]} type="submit">
        Create
      </button>
      <span className={classes.question}>
        Already have an account?{" "}
        <Link className={classes.link} to="/sign-in">
          Sign In.
        </Link>
      </span>
    </form>
  );
};

export default SignUp;
