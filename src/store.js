import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducer from './ducks/reducer';

export default createStore( reducer, undefined, applyMiddleware( promiseMiddleware() ) );