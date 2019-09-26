import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import from module created in types.d.ts gets imported
import { RootAction, RootState, Services } from 'typesafe-actions';
// utils
import { composeEnhancers } from './utils';
// material for the store:
import rootReducer from './root-reducer';
// import services from services
import services from '../services';
import RootEpic from './root-epic';

// create epicMiddleware

// the createEpicMiddleware is constituted of the types of RootAction,
// RoosState etc I created in the module at types.d.ts file

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

// onfigure middlewares
const middlewares = [epicMiddleware];

// compose enhancers here
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate app state on app start: the initial state.
const initialState = {};

// finally, create store: created with the reducer, the initial state, and the enhancers,
// hence the rootReducer !

const store = createStore(rootReducer, initialState, enhancer);

// cf new version of redux-observable: now you have to run epic middleware right AFTER creating the store.
epicMiddleware.run(RootEpic);

export default store;
