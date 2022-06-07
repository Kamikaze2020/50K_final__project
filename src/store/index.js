import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {clientReducer} from "./clientReducer";

const rootReducer = combineReducers({
  clients: clientReducer
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));