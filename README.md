# Conductor

Test task

##### What's Being Used?

- [React](http://facebook.github.io/react/) for managing the presentation logic of your application.
- [Redux](http://redux.js.org/) for generating and managing your state model.
- [CSS modules](https://github.com/css-modules/css-modules) + [Semantic UI](https://react.semantic-ui.com/introduction) for stylesheet compilation.
- [TypeScript](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html) to support type checking.
- [WebPack](http://webpack.github.io/) for bundling code down to a single file and enabling hot module reloading.
- [Create React App](https://github.com/facebook/create-react-app) for project initial build.
- [Redux Form](https://redux-form.com/) for form handling.

## Getting Started

In order to get started developing, you'll need to do a few things first.

[1]. Install all of the `node_modules` required for the package. Depending on your computer's configuration, you may need to prefix this command with a `sudo`.

```
npm install
```

or

```
sudo npm install
```

[2]. Lastly, run the start command to get the project off the ground. This command will build your JS files using the Webpack `dev-server`.

```
npm run start
```

[3]. Head over to [http://localhost:3000](http://localhost:3000) to see your app.

## File Structure is build by [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux)

### build/

This is where your application will be compiled. Assets, like images and fonts, should be placed directly within this folder. Also in this folder is a default `index.html` file for serving up the application.

### src/

The client folder houses the client application for your project. This is where your client-side Javascript components (and their directly accompanying styles) live.

## App Components

### Actions

These are your typical Redux action creators.
You need to name data - `payload` in any causes except error

```typescript
export function formSubmitSignIn(
  payload: FormSubmitActionPayloadType<FormSignInDataType>
) {
  return {
    payload,
    type: FORM_SUBMIT_SIGN_IN
  };
}

export function fetchSignIn(payload: FormSignInDataType) {
  return {
    payload,
    type: FETCH_SIGN_IN_REQUEST
  };
}

export function fetchSignInSuccess(payload: LoginPayload) {
  return {
    payload,
    type: FETCH_SIGN_IN_SUCCESS
  };
}

export function fetchSignInFailure(error: ErrorType) {
  return {
    error,
    type: FETCH_SIGN_IN_FAILURE
  };
}
```

### Components

Here is typical component.
Use TS for define your types.

```typescript jsx
import cn from "classnames";
import * as React from "react";
import * as Semantic from "semantic-ui-react";
import "./Button.scss";

export interface IButtonProps extends Semantic.ButtonProps {
  children: React.ReactNode;
  size?: "small" | "big";
  template?: "primary" | "secondary";
}

function Button(props: IButtonProps): JSX.Element {
  const { children, template, ...rest } = props;

  const classes = cn("semantic-button", `template--${template}`);

  return (
    <Semantic.Button {...rest} className={classes}>
      {children}
    </Semantic.Button>
  );
}

Button.defaultProps = {
  size: "big",
  template: "primary"
};

export default Button;
```

#### For middleware we use ReduxSaga


```typescript
function* fetchTranslatesSaga({ payload }: ActionType): SagaIterator {
  try {
    const response = yield call(ApiFetchTranslates, payload.locale);

    yield put(fetchTranslatesSucces(response.translates));
  } catch (error) {
    yield put(fetchTranslatesError(error));
  }
}
```

Dont forget to combine all sagas and spawn them in root saga `src/redux/saga.ts` 

```typescript
export const saga = function* () {
  yield all([takeEvery(FETCH_REPOS_REQUEST, fetchReposSaga)]);
};
```

#### API request
```typescript
function* ApiFetchLinkClicks(payload: { id: string; dates: { size: number; to: string } }) {
  return yield call(
    callApi,
    API_URI + `/bitlinks/${payload.id}/clicks?units=${payload.dates.size}&unit_reference=${payload.dates.to}`
  );
}
```

### Reducers

Your Redux reducers that will generate your state model.

We use `switch` in reducer.

Also we use `isFetching` for knowing current state of this branch.

Don't forget to add it to root reducer in `src/redux/reducer.ts`

```typescript
interface State {
  error: string | null;
  isFetching: boolean;
  entities: Translation | null;
}

const initialState: State = {
  entities: null,
  error: null,
  isFetched: false,
  isFetching: false
};

export default function reducer(
  state: State = initialState,
  action: ActionType
) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_TRANSLATES_REQUEST:
      return Object.assign({}, state, {
        error: null,
        isFetching: true
      });
    case FETCH_TRANSLATES_SUCCESS:
      return Object.assign({}, state, {
        entities: {
          ...payload,
          data: arrayToSimpleHashMap(payload.data, "source", "target")
        },
        error: null,
        isFetching: false
      });
    case FETCH_TRANSLATES_FAILURE:
      return Object.assign({}, state, {
        error,
        isFetching: false
      });

    default:
      return state;
  }
}
```

### Constants

We use `${appName}/${moduleName}` as prefix for all events:

```typescript
export const moduleName = "dictLocales";
const prefix = `${appName}/${moduleName}`;
export const FETCH_DICT_LOCALES_REQUEST = `${prefix}/FETCH_DICT_LOCALES_REQUEST`;
export const FETCH_DICT_LOCALES_SUCCESS = `${prefix}/FETCH_DICT_LOCALES_SUCCESS`;
export const FETCH_DICT_LOCALES_FAILURE = `${prefix}/FETCH_DICT_LOCALES_FAILURE`;
```

### Selectors

It`s important to use selectors when you whant to pass any data from store to your component, even when you need to normalise it:

```typescript
const stateSelector = state => state[moduleName];
export const selectLocales = createSelector(
  stateSelector,
  state => state.locales
);
export const selectLocalesForOptionsList = createSelector(
  selectLocales,
  locales =>
    !!locales
      ? map(locales, ({ label, id }) => {
          return {
            text: id.toUpperCase(),
            value: id
          };
        })
      : []
);
```

## UI

### [Semantic UI](https://react.semantic-ui.com/introduction)
