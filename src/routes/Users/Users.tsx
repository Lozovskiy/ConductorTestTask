import React, { Component } from "react";
import { Button, Header, Input, Message } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import { connect } from "react-redux";
import { Store } from "redux";

import { fetchUsers, selectUsersEntities, selectUsersError, selectUsersIsFetching } from "ducks/users";
import { ActionType, ErrorType, SearchUserResponseType } from "types/common";
import UsersList from "components/UsersList/UsersList";

import styles from "./Users.module.scss";

interface Props {
  usersIsFetching: boolean;
  error: ErrorType | null;
  fetchUsers: (payload: string) => ActionType;
  userEntities: SearchUserResponseType | null;
}

interface State {
  searchData: string;
}

class Users extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchData: "",
    };
  }

  public onSearchChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    this.setState({ searchData: value });
  };

  public onSubmit = () => {
    const { searchData } = this.state;
    if (!searchData) return;
    this.props.fetchUsers(searchData);
  };

  render() {
    const { userEntities, usersIsFetching, error } = this.props;

    return (
      <div>
        <Header as="h1">Users</Header>
        <Input fluid={true} placeholder="Search..." onChange={this.onSearchChange} />
        <div className={styles.buttonContainer}>
          <Button onClick={this.onSubmit} primary={true} loading={usersIsFetching}>
            Search
          </Button>
        </div>
        {error && <Message negative={true}>{error.message || error}</Message>}
        {!userEntities && <div className={styles.placeholder}>Try to find someone...</div>}
        {userEntities?.items?.length === 0 && (
          <div className={styles.placeholder}>Can't find users by search parameters</div>
        )}
        {!!userEntities?.items.length && <UsersList users={userEntities.items} />}
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => ({
  usersIsFetching: selectUsersIsFetching(state),
  userEntities: selectUsersEntities(state),
  error: selectUsersError(state),
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
