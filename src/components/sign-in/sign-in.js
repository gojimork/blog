import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import BlogApiService from "../../blog-api-service";
import classes from "./sign-in.module.scss";
import { useState } from "react";
import { Alert } from "antd";

const SignIn = ({ setUserDetails }) => {
  const [serverError, setServerError] = useState(false);
  const blogApiService = new BlogApiService();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const onSignIn = async (user) => {
    try {
      const response = await blogApiService.userLogin({ user });
      if (response.ok) {
        const user = await response.json();
        setServerError(false);
        setUserDetails(user);
      } else {
        const errorObj = await response.json();
        const errors = errorObj.errors;
        Object.keys(errors).forEach((key) =>
          setServerError(`${key} ${errors[key]}`)
        );
        console.log(errorObj.errors);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSignIn)}
      className={classes["sing-in"]}
    >
      {serverError && (
        <Alert
          message="Server Error"
          description={serverError}
          type="error"
          showIcon
        />
      )}
      <h2 className={classes["sing-in__title"]}>Sign In</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="email">Email address</label>
          <input
            placeholder="Email address"
            {...register("email", {
              required: "Input is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "incorrect email",
              },
            })}
          />
          {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { equired: "Input is required" })}
          />
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
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
