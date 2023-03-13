import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className={classes["app-wrap"]}>
        <Header />
        <Route path="/" exact component={Articles} />
        <Route
          exact
          path="/:page"
          render={({ match }) => {
            const { page } = match.params;
            return <Articles page={page} />;
          }}
        />
      </div>
    </Router>
  );
};

export default App;
