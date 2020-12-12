import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ROUTES } from "utils/constants";
import Users from "routes/Users/Users";

import styles from "./RootRouter.module.scss";

class RootRouter extends Component {
  render() {
    return (
      <>
        <div className={styles.root}>
          <Switch>
            <Redirect from={ROUTES.root} exact={true} to={ROUTES.users} />
            <Route path={ROUTES.users} exact={true} component={Users}/>
          </Switch>
        </div>
      </>
    );
  }
}

export default RootRouter;
