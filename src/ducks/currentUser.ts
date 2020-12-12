import { API_URI, appName } from "utils/constants";
import { ActionType, ErrorType, UserType } from "types/common";
import { Store } from "redux";
import { SagaIterator } from "redux-saga";
import { createSelector } from "reselect";
import { callApi } from "redux/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

/* Constants */

export const moduleName = "currentUser";

const prefix = `${appName}/${moduleName}`;

export const FETCH_USER_REQUEST = `${prefix}/FETCH_USER_REQUEST`;
export const FETCH_USER_SUCCESS = `${prefix}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAILURE = `${prefix}/FETCH_USER_FAILURE`;

/* Reducer */

interface State {
  error: ErrorType | null;
  isFetching: boolean;
  entities: UserType | null;
}

const initialState: State = {
  error: null,
  isFetching: false,
  entities: null,
};

export default function reducer(state: State = initialState, action: ActionType) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        error: null,
        isFetching: true,
      });

    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        entities: payload,
        error: null,
        isFetching: false,
      });

    case FETCH_USER_FAILURE:
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

export const selectCurrentUserEntities = createSelector(stateSelector, (state: State) => state.entities);

export const selectCurrentUserIsFetching = createSelector(stateSelector, (state: State) => state.isFetching);

export const selectCurrentUserError = createSelector(stateSelector, (state: State) => state.error);

/* Actions */

export function fetchUser(payload: string) {
  return {
    payload,
    type: FETCH_USER_REQUEST,
  };
}
export function fetchUserSuccess(payload: UserType) {
  return {
    payload,
    type: FETCH_USER_SUCCESS,
  };
}
export function fetchUserFailure(error: ErrorType) {
  return {
    error,
    type: FETCH_USER_FAILURE,
  };
}

/* Sagas */

function* fetchUserSaga({ payload }: ActionType): SagaIterator {
  try {
    const response = yield call(ApiFetchUser, payload);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export const saga = function* () {
  yield all([takeEvery(FETCH_USER_REQUEST, fetchUserSaga)]);
};

/* API */

function* ApiFetchUser(user: string) {
  return yield call(callApi, API_URI + `/users/${user}`);
}
