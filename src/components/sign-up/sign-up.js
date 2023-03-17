import { Link } from "react-router-dom";
import classes from "./sign-up.module.scss";
import BlogApiService from "../../blog-api-service";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const blogApiService = new BlogApiService();

  const onCreateUserSubmit = (e) => {
    e.preventDefault();
    blogApiService.postUser({
      user: {
        username,
        email,
        password,
      },
    });
  };

  return (
    <form
      method="post"
      className={classes["sing-up"]}
      onSubmit={onCreateUserSubmit}
    >
      <h2 className={classes["sing-up__title"]}>Create new account</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </li>
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
        <li className={classes["input-item"]}>
          <label htmlFor="repeat-password">Repeat Password</label>
          <input type="text" name="repeat-password" placeholder="Password" />
        </li>
      </ul>
      <div className={classes.agreement}>
        <input type="checkbox" />
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
