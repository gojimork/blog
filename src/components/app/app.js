import classes from "./app.module.scss";
import Header from "../header";
import Articles from "../articles";

const App = () => {
  return (
    <div className={classes["app-wrap"]}>
      <Header />
      <Articles />
    </div>
  );
};

export default App;
