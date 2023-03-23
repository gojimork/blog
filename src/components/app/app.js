import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";
import ArticleDetails from "../article-details";
import SignUp from "../sign-up";
import Profile from "../profile";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from "../sign-in";
import CreateArticle from "../create-article";
import EditArticle from "../edit-article";
import { useCookies } from "react-cookie";
import { message } from "antd";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "success",
    });
  };
  const articleList = "/page/:page";
  const articleDetails = "/article/:slug";
  const signUp = "/sign-up";
  const signIn = "/sign-in";
  const profile = "/profile";
  const createArticle = "/new-article";
  const editArticle = "/articles/:slug/edit";
  const defaultPage = "/page/1";
  return (
    <Router>
      <div className={classes["app-wrap"]}>
        <Header cookies={cookies} removeCookie={removeCookie} />
        {contextHolder}
        <div className={classes["articles-wrap"]}>
          <Switch>
            <Route
              exact
              path={articleList}
              render={({ match }) => {
                const { page } = match.params;
                return <Articles page={Number(page)} />;
              }}
            />
            <Route
              path={articleDetails}
              render={({ match }) => {
                const { slug } = match.params;
                return <ArticleDetails slug={slug} success={success} />;
              }}
            />
            <Route
              path={signUp}
              render={() => {
                return <SignUp success={success} />;
              }}
            />
            <Route
              path={signIn}
              render={() => {
                return <SignIn setCookie={setCookie} success={success} />;
              }}
            />
            <Route
              path={profile}
              render={() => {
                return <Profile cookies={cookies} success={success} />;
              }}
            />
            <Route
              path={createArticle}
              render={() => {
                return <CreateArticle cookies={cookies} success={success} />;
              }}
            />
            <Route
              path={editArticle}
              render={({ match }) => {
                const { slug } = match.params;
                return (
                  <EditArticle
                    slug={slug}
                    cookies={cookies}
                    success={success}
                  />
                );
              }}
            />
            <Redirect to={defaultPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
