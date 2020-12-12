import { combineReducers } from "redux";

import usersModule, { moduleName as usersModuleName } from "ducks/users";
import currentUserModule, { moduleName as currentUserModuleName } from "ducks/currentUser";

// Add all reducers here.
export default combineReducers({
  [usersModuleName]: usersModule,
  [currentUserModuleName]: currentUserModule,
});
