import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";
import ArticleDetails from "../article-details";
import SignUp from "../sign-up";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from "../sign-in";
import { useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [userDetails, setUserDetails] = useState(null);
  return (
    <Router>
      <div className={classes["app-wrap"]}>
        <Header
          userDetails={userDetails}
          cookies={cookies}
          removeCookie={removeCookie}
        />
        <div className={classes["articles-wrap"]}>
          <Switch>
            <Route
              exact
              path="/page/:page"
              render={({ match }) => {
                const { page } = match.params;
                return <Articles page={Number(page)} />;
              }}
            />
            <Route
              path="/article/:slug"
              render={({ match }) => {
                const { slug } = match.params;
                return <ArticleDetails slug={slug} />;
              }}
            />
            <Route
              path="/sign-up"
              render={() => {
                return <SignUp />;
              }}
            />
            <Route
              path="/sign-in"
              render={() => {
                return (
                  <SignIn
                    setUserDetails={setUserDetails}
                    setCookie={setCookie}
                  />
                );
              }}
            />
            <Redirect to="page/1" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
