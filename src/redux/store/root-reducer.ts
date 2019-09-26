import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todosReducer from '../modules/todos/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
});

export default rootReducer;
