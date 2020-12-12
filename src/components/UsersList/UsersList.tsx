import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { UserListItemType } from "types/common";
import { ROUTES } from "utils/constants";

import styles from "./UsersList.module.scss";

interface Props {
  users: UserListItemType[];
}

function UsersList(props: Props) {
  const renderUsersList = () => {
    return props.users.map((item) => (
      <Card as={Link} to={ROUTES.users + "/" + item.login} key={item.id} className={styles.itemContainer}>
        <Image src={item.avatar_url} wrapped={true} ui={false} />
        <Card.Content>
          <Card.Header>{item.login}</Card.Header>
        </Card.Content>
      </Card>
    ));
  };

  return <Card.Group className={styles.root}>{renderUsersList()}</Card.Group>;
}

export default UsersList;
