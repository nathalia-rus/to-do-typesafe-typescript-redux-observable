import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import from module created in types.d.ts gets imported
import { RootAction, RootState, Services } from 'typesafe-actions';

import { composeEnhancers } from './utils';

import rootReducer from './root-reducer';
import rootAction from './root-action';
import RootEpic from './root-epic';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: Services,
});
