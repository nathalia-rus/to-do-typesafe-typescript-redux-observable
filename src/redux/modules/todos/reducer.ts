// create store for todos (basically reducer for the main final store)

import { Todo } from 'myModels';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { addTodo, removeTodo, loadTodosAsync } from './actions';

import cuid from 'cuid';

// state of whether it is loading:
export const isLoadingTodos = createReducer(false as boolean)
  .handleAction([loadTodosAsync.request], (state, action) => true)
  .handleAction(
    [loadTodosAsync.success, loadTodosAsync.failure],
    (state, action) => false
  );

// todos' state:
export const todos = createReducer([
  {
    id: cuid(),
    title: 'This is the default Todo that loads on start app',
  },
] as Todo[])
  .handleAction(addTodo, (state, action) => [...state, action.payload])
  .handleAction(removeTodo, (state, action) =>
    state.filter(i => i.id !== action.payload)
  );

const todosReducer = combineReducers({ isLoadingTodos, todos });

export default todosReducer;

export type TodosState = ReturnType<typeof todosReducer>;
