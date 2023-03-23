import classes from "./profile.module.scss";
import BlogApiService from "../../blog-api-service";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Profile = ({ cookies, success }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: "onBlur" });

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const blogApiService = new BlogApiService();

  const onEditSubmit = async (user) => {
    const body = { user: user };
    const token = cookies.token;
    try {
      setLoading(true);
      const response = await blogApiService.editProfile(body, token);
      if (response.ok) {
        console.log("Profile edited successfully", user);
        success();
        history.push("/");
      } else {
        const errorsObj = await response.json();
        console.log(errorsObj);
        const errors = errorsObj.errors;
        Object.keys(errors).forEach((key) => {
          setError(key, { type: "server", message: errors[key] });
        });
      }
    } catch (error) {
      console.error("Profile edited failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      method="post"
      className={classes["sing-up"]}
      onSubmit={handleSubmit(onEditSubmit)}
    >
      <h2 className={classes["sing-up__title"]}>Edit Profile</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="name">Username</label>
          <input
            {...register("username", {
              required: "Поле обязательное для заполнения",
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
          <label htmlFor="password">New password</label>
          <input
            type="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимум 40 символов",
              },
            })}
            placeholder="New password"
          />
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="avatarImage">Avatar image (url)</label>
          <input
            placeholder="URL"
            {...register("image", {
              pattern: {
                value: /^https?:\/\/.+$/,
                message: "Invalid URL",
              },
            })}
          />
          {errors?.image && <p>{errors?.image?.message || "Error!"}</p>}
        </li>
      </ul>

      <button
        className={classes["submit-btn"]}
        type="submit"
        disabled={loading}
      >
        Save
      </button>
    </form>
  );
};

export default Profile;
