import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Store } from "redux";
import { Button, Card, Image, Input, Loader, Message } from "semantic-ui-react";

import {
  fetchUser,
  selectCurrentUserEntities,
  selectCurrentUserError,
  selectCurrentUserIsFetching,
} from "ducks/currentUser";
import { ActionType, ErrorType, RepoSearchArgumentsType, ReposType, SearchResponseType, UserType } from "types/common";
import { fetchRepos, selectReposEntities, selectReposError, selectReposIsFetching } from "ducks/repos";
import ReposList from "components/ReposList/ReposList";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";

import styles from "./CurrentUser.module.scss";

interface Props extends RouteComponentProps<{ id: string }> {
  repos: SearchResponseType<ReposType> | null;
  currentUser: UserType | null;
  currentUserIsFetching: boolean;
  reposIsFetching: boolean;
  currentUserError: ErrorType | null;
  reposError: ErrorType | null;
  fetchUser: (payload: string) => ActionType;
  fetchRepos: (payload: RepoSearchArgumentsType) => ActionType;
}

interface State {
  searchData: string;
}

class CurrentUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchData: "",
    };
  }

  public componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchUser(id);
    this.props.fetchRepos({
      user: id,
    });
  }

  public onSearchChange = (event: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    this.setState({ searchData: value });
  };

  public onSubmit = () => {
    const { id } = this.props.match.params;
    const { searchData } = this.state;
    this.props.fetchRepos({
      user: id,
      query: searchData,
    });
  };

  render() {
    const { currentUser, currentUserIsFetching, repos, reposError, currentUserError, reposIsFetching } = this.props;
    return (
      <div className={styles.root}>
        {currentUserIsFetching && <Loader active={true} />}
        {currentUserError && <Message negative={true}>{currentUserError.message || currentUserError}</Message>}
        {reposError && <Message negative={true}>{reposError.message || reposError}</Message>}
        <div className={styles.contentWrapper}>
          {!!currentUser && (
            <Card>
              <Image src={currentUser.avatar_url} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{currentUser.name}</Card.Header>
                <Card.Meta>{currentUser.location}</Card.Meta>
                <Card.Description>{currentUser.email}</Card.Description>
                <Card.Description>{currentUser.bio}</Card.Description>
              </Card.Content>
              <Card.Content extra>{currentUser.followers} Followers</Card.Content>
            </Card>
          )}
          <div className={styles.repoContainer}>
            <Input fluid={true} placeholder="Search..." onChange={this.onSearchChange} />
            <div className={styles.buttonContainer}>
              <Button onClick={this.onSubmit} primary={true} loading={reposIsFetching}>
                Search
              </Button>
            </div>
            {!!repos?.items?.length && <ReposList repos={repos.items} />}
            {repos?.items?.length === 0 && <div className={styles.placeholder}>No repositories found</div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => ({
  currentUser: selectCurrentUserEntities(state),
  currentUserIsFetching: selectCurrentUserIsFetching(state),
  currentUserError: selectCurrentUserError(state),
  repos: selectReposEntities(state),
  reposIsFetching: selectReposIsFetching(state),
  reposError: selectReposError(state),
});

const mapDispatchToProps = {
  fetchUser,
  fetchRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
