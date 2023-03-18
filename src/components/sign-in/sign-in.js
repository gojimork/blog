import { Link } from "react-router-dom";
import { Alert } from "antd";
import { useState } from "react";
import BlogApiService from "../../blog-api-service";
import classes from "./sign-in.module.scss";

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const blogApiService = new BlogApiService();

  const onCreateUserSubmit = async (e) => {
    e.preventDefault();
    const response = await blogApiService.userLogin({
      user: {
        email,
        password,
      },
    });
    if (response.user) {
      setErrorMessage(false);
      onLogin(response.user);
    }
    if (response.errors) {
      const { errors } = response;
      const keys = Object.keys(errors);
      const alerts = keys.map((key) => (
        <li key={key}>
          <Alert message={`${key} ${errors[key]}`} type="error" showIcon />
        </li>
      ));
      setErrorMessage(alerts);
    }
  };
  return (
    <form
      method="post"
      onSubmit={onCreateUserSubmit}
      className={classes["sing-in"]}
    >
      {errorMessage ? <ul>{errorMessage}</ul> : null}
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
