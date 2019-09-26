// create store for todos (basically reducer for the main final store)

import { Todo } from 'myModels';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { addTodo, removeTodo, loadTodosAsync, saveTodosAsync } from './actions';
