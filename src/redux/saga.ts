import { SagaIterator } from "redux-saga";
import { spawn } from "redux-saga/effects";

import { saga as users } from "ducks/users";
import { saga as currentUser } from "ducks/currentUser";
import { saga as repos } from "ducks/repos";

export default function* rootSaga(): SagaIterator {
  yield spawn(users);
  yield spawn(currentUser);
  yield spawn(repos);
}
