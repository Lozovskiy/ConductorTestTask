import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ROUTES } from "utils/constants";
import Users from "routes/Users/Users";
import CurrentUser from "routes/CurrentUser/CurrentUser";

import styles from "./RootRouter.module.scss";

class RootRouter extends Component {
  render() {
    return (
      <>
        <div className={styles.root}>
          <Switch>
            <Redirect from={ROUTES.root} exact={true} to={ROUTES.users} />
            <Route path={ROUTES.users} exact={true} component={Users} />
            <Route path={ROUTES.users + "/:id"} exact={true} component={CurrentUser} />
          </Switch>
        </div>
      </>
    );
  }
}

export default RootRouter;
