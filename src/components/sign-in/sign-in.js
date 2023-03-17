import { Link } from "react-router-dom";
import { useState } from "react";
import BlogApiService from "../../blog-api-service";
import classes from "./sign-in.module.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const blogApiService = new BlogApiService();

  const onCreateUserSubmit = (e) => {
    e.preventDefault();
    blogApiService.userLogin({
      user: {
        email,
        password,
      },
    });
  };
  return (
    <form
      method="post"
      onSubmit={onCreateUserSubmit}
      className={classes["sing-in"]}
    >
      <h2 className={classes["sing-in__title"]}>Sign In</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
      </ul>

      <button className={classes["submit-btn"]} type="submit">
        Login
      </button>
      <span className={classes.question}>
        Don't have an account?{" "}
        <Link className={classes.link} to="/sign-up">
          Sign Up.
        </Link>
      </span>
    </form>
  );
};

export default SignIn;
