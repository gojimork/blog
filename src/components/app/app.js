import classes from "./app.module.scss";
import Header from "../header";

function App() {
  return (
    <div className={classes["app-wrap"]}>
      <Header />
      <div className={classes.main}></div>
    </div>
  );
}

export default App;
