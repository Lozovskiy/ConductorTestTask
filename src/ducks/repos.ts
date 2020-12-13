import { API_URI, appName } from "utils/constants";
import { ActionType, ErrorType, RepoSearchArgumentsType, ReposType, SearchResponseType } from "types/common";
import { Store } from "redux";
import { SagaIterator } from "redux-saga";
import { createSelector } from "reselect";
import { callApi } from "redux/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

/* Constants */

export const moduleName = "repos";

const prefix = `${appName}/${moduleName}`;

export const FETCH_REPOS_REQUEST = `${prefix}/FETCH_REPOS_REQUEST`;
export const FETCH_REPOS_SUCCESS = `${prefix}/FETCH_REPOS_SUCCESS`;
export const FETCH_REPOS_FAILURE = `${prefix}/FETCH_REPOS_FAILURE`;

/* Reducer */

interface State {
  error: ErrorType | null;
  isFetching: boolean;
  entities: SearchResponseType<ReposType> | null;
}

const initialState: State = {
  error: null,
  isFetching: false,
  entities: null,
};

export default function reducer(state: State = initialState, action: ActionType) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_REPOS_REQUEST:
      return Object.assign({}, state, {
        error: null,
        isFetching: true,
      });

    case FETCH_REPOS_SUCCESS:
      return Object.assign({}, state, {
        entities: payload,
        error: null,
        isFetching: false,
      });

    case FETCH_REPOS_FAILURE:
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

export const selectReposEntities = createSelector(stateSelector, (state: State) => state.entities);

export const selectReposIsFetching = createSelector(stateSelector, (state: State) => state.isFetching);

export const selectReposError = createSelector(stateSelector, (state: State) => state.error);

/* Actions */

export function fetchRepos(payload: RepoSearchArgumentsType) {
  return {
    payload,
    type: FETCH_REPOS_REQUEST,
  };
}
export function fetchReposSuccess(payload: SearchResponseType<ReposType>) {
  return {
    payload,
    type: FETCH_REPOS_SUCCESS,
  };
}
export function fetchReposFailure(error: ErrorType) {
  return {
    error,
    type: FETCH_REPOS_FAILURE,
  };
}

/* Sagas */

function* fetchReposSaga({ payload }: ActionType): SagaIterator {
  try {
    const response = yield call(ApiFetchRepos, payload);
    yield put(fetchReposSuccess(response));
  } catch (error) {
    yield put(fetchReposFailure(error));
  }
}

export const saga = function* () {
  yield all([takeEvery(FETCH_REPOS_REQUEST, fetchReposSaga)]);
};

/* API */

function* ApiFetchRepos(data: RepoSearchArgumentsType) {
  return yield call(
    callApi,
    API_URI + `/search/repositories?q=user:${data.user}${data.query ? ` ${data.query} in:name` : ""}`
  );
}
