// create store for todos (basically reducer for the main final store)

import { Todo } from 'myModels';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { addTodo, removeTodo, loadTodosAsync, saveTodosAsync } from './actions';

export const isLoadingTodos = createReducer(false as boolean)
  .handleAction([loadTodosAsync.request], (state, action) => true)
  .handleAction(
    [loadTodosAsync.success, loadTodosAsync.failure],
    (state, action) => false
  );
