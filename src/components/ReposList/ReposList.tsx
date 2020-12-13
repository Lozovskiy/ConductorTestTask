import React from "react";
import { ReposType } from "types/common";
import { Table } from "semantic-ui-react";

import styles from "./ReposList.module.scss";

interface Props {
  repos: ReposType[];
}

function ReposList(props: Props) {
  const renderRepoInfo = () => {
    return props.repos.map((item) => (
      <Table.Row>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.fork ? "Yes" : "No"}</Table.Cell>
        <Table.Cell>{item.stargazers_count}</Table.Cell>
        <Table.Cell>{item.forks}</Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <Table celled={true} striped={true}>
      <Table.Header>
        <Table.Row className={styles.headerRow} >
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Is fork</Table.HeaderCell>
          <Table.HeaderCell>Stars</Table.HeaderCell>
          <Table.HeaderCell>Forks</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{renderRepoInfo()}</Table.Body>
    </Table>
  );
}

export default ReposList;
