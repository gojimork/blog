import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";
import ArticleDetails from "../article-details";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className={classes["app-wrap"]}>
        <Header />
        <div className={classes["articles-wrap"]}>
          <Switch>
            <Route
              exact
              path="/:page"
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
            <Redirect to="/1" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
