import BlogApiService from "../../blog-api-service";
import classes from "./header.module.scss";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { useCallback, useEffect, useState, useMemo } from "react";

export default function Header({ cookies, removeCookie }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const blogApiService = useMemo(() => new BlogApiService(), []);

  console.log(cookies);
  const auth = useCallback(async () => {
    if (Object.keys(cookies).length > 0) {
      try {
        const response = await blogApiService.getUser(cookies?.token);
        if (response.ok) {
          const { user } = await response.json();
          setUserDetails(user);
          setIsLoggedIn(true);
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setUserDetails(null);
      setIsLoggedIn(false);
    }
  }, [cookies, blogApiService]);

  useEffect(() => {
    auth();
  }, [auth]);

  if (isLoggedIn) {
    const { username } = userDetails;
    return (
      <header className={classes.header}>
        <Link to="/" className={classes["header__title"]}>
          Realworld Blog
        </Link>
        <ul className={classes["auth"]}>
          <li>
            <Link
              to="/new-article"
              className={`${classes["auth__btn"]} ${classes["auth__btn--priority"]}`}
            >
              Create article
            </Link>
          </li>
          <li>
            <Link to="/profile" className={classes.user}>
              <span>{username}</span>
              <Avatar
                size={46}
                src="https://static.productionready.io/images/smiley-cyrus.jpg"
              />
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => removeCookie("token")}
              className={`${classes["auth__btn"]} `}
            >
              Log Out
            </button>
          </li>
        </ul>
      </header>
    );
  }
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
