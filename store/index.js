import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./gameReducer";

const middleware = applyMiddleware();
// createLogger({ collapsed: true })

const store = createStore(reducer, middleware);

export default store;
