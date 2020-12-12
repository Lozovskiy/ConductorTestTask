import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Store } from "redux";
import { Image, Loader } from "semantic-ui-react";

import { fetchUser, selectCurrentUserEntities, selectCurrentUserIsFetching } from "ducks/currentUser";
import { ActionType, UserType } from "types/common";

interface Props extends RouteComponentProps<{ id: string }> {
  fetchUser: (payload: string) => ActionType;
  currentUser: UserType | null;
  currentUserIsFetching: boolean;
}

class CurrentUser extends Component<Props> {
  public componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchUser(id);
  }

  render() {
    const { currentUser, currentUserIsFetching } = this.props;
    return <div>{currentUserIsFetching ? <Loader active={true} /> : <div></div>}</div>;
  }
}

const mapStateToProps = (state: Store) => ({
  currentUser: selectCurrentUserEntities(state),
  currentUserIsFetching: selectCurrentUserIsFetching(state),
});

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
