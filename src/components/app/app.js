import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";
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
        <Switch>
          <Route
            exact
            path="/page/:page"
            render={({ match }) => {
              const { page } = match.params;
              return <Articles page={Number(page)} />;
            }}
          />
          <Redirect to="/page/1" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
