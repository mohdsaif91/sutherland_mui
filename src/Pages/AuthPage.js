import { makeStyles } from "@mui/styles";
import React from "react";

const styles = makeStyles({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "24px",
  },
});

function AuthPage() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.text}>Please sign In to view the data !</div>
    </div>
  );
}

export default AuthPage;
