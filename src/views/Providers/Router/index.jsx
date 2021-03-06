import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { history } from "./modules";

const OrigRouter = props => {
  return <Router history={history}>{props.children}</Router>;
};

export default OrigRouter;
