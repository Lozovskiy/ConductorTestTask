import { API_URI, appName } from "utils/constants";
import { ActionType, ErrorType, SearchResponseType, UserListItemType } from "types/common";
import { Store } from "redux";
import { SagaIterator } from "redux-saga";
import { createSelector } from "reselect";
import { callApi } from "redux/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

/* Constants */

export const moduleName = "users";

const prefix = `${appName}/${moduleName}`;

export const FETCH_USERS_REQUEST = `${prefix}/FETCH_USERS_REQUEST`;
export const FETCH_USERS_SUCCESS = `${prefix}/FETCH_USERS_SUCCESS`;
export const FETCH_USERS_FAILURE = `${prefix}/FETCH_USERS_FAILURE`;

/* Reducer */

interface State {
  error: ErrorType | null;
  isFetching: boolean;
  entities: SearchResponseType<UserListItemType> | null;
}

const initialState: State = {
  error: null,
  isFetching: false,
  entities: null,
};

export default function reducer(state: State = initialState, action: ActionType) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        error: null,
        isFetching: true,
      });

    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        entities: payload,
        error: null,
        isFetching: false,
      });

    case FETCH_USERS_FAILURE:
      return Object.assign({}, state, {
        error,
        isFetching: false,
      });

    default:
      return state;
  }
}

/* Selectors */

const stateSelector = (state: Store) => state[moduleName];

export const selectUsersEntities = createSelector(stateSelector, (state: State) => state.entities);

export const selectUsersIsFetching = createSelector(stateSelector, (state: State) => state.isFetching);

export const selectUsersError = createSelector(stateSelector, (state: State) => state.error);

/* Actions */

export function fetchUsers(payload: string) {
  return {
    payload,
    type: FETCH_USERS_REQUEST,
  };
}
export function fetchUsersSuccess(payload: SearchResponseType<UserListItemType>) {
  return {
    payload,
    type: FETCH_USERS_SUCCESS,
  };
}
export function fetchUsersFailure(error: ErrorType) {
  return {
    error,
    type: FETCH_USERS_FAILURE,
  };
}

/* Sagas */

function* fetchUsersSaga({ payload }: ActionType): SagaIterator {
  try {
    const response = yield call(ApiFetchUsers, payload);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export const saga = function* () {
  yield all([takeEvery(FETCH_USERS_REQUEST, fetchUsersSaga)]);
};

/* API */

function* ApiFetchUsers(query: string) {
  return yield call(callApi, API_URI + `/search/users?q=${query}`);
}
