import { Link } from "react-router-dom";
import classes from "./sign-up.module.scss";
import BlogApiService from "../../blog-api-service";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const SignUp = ({ success }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setError,
  } = useForm({ mode: "onBlur" });

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const blogApiService = new BlogApiService();

  const onCreateUserSubmit = async (user) => {
    try {
      setLoading(true);
      const response = await blogApiService.postUser({ user });
      if (response.ok) {
        console.log("Form data submitted successfully");
        success();
        history.push("/sign-in");
      } else {
        const errorsObj = await response.json();
        const errors = errorsObj.errors;
        Object.keys(errors).forEach((key) => {
          setError(key, { type: "server", message: errors[key] });
        });
      }
    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      method="post"
      className={classes["sing-up"]}
      onSubmit={handleSubmit(onCreateUserSubmit)}
    >
      <h2 className={classes["sing-up__title"]}>Create new account</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="name">Username</label>
          <input
            {...register("username", {
              required: "Поле обязательное для заполнения",
              minLength: {
                value: 3,
                message: "Миниумум 3 символа",
              },
              maxLength: {
                value: 20,
                message: "Максимум 20 символов",
              },
            })}
            placeholder="Username"
          />
          {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="email">Email address</label>
          <input
            {...register("email", {
              required: "Поле обязательное для заполнения",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "incorrect email",
              },
            })}
            placeholder="Email address"
          />
          {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Поле обязательное для заполнения",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимум 40 символов",
              },
            })}
            placeholder="Password"
          />
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("passwordRepeat", {
              required: "Поле обязательное для заполнения",
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
          />
          {errors?.passwordRepeat && (
            <p>{errors?.passwordRepeat?.message || "Error!"}</p>
          )}
        </li>
      </ul>
      <div className={classes.agreement}>
        <input
          type="checkbox"
          {...register("agreement", {
            required: "Нужно обязательно поставить галочку",
          })}
        />
        <label>I agree to the processing of my personal information</label>
        {errors?.agreement && <p>{errors?.agreement?.message || "Error!"}</p>}
      </div>

      <button
        className={classes["submit-btn"]}
        disabled={loading}
        type="submit"
      >
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
