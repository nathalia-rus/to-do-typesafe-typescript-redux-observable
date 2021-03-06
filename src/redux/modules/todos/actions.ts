// this is where you define + create the actions
// using createAction for normal actions and C
// reateAsyncAction for stuff which requres usage of API / services etc - async

// you import your models here too, the ones created in the module in types.d.ts

import { Todo } from 'myModels';

import cuid from 'cuid';

import { createAsyncAction, createStandardAction } from 'typesafe-actions';

export const addTodo = createStandardAction('ADD_TODO').map(
  ({ title }: { title: string }): { payload: Todo } => ({
    payload: {
      title: title,
      id: cuid(),
    },
  })
);

export const removeTodo = createStandardAction('REMOVE_TODO')<string>();

// create async fn to load todos
export const loadTodosAsync = createAsyncAction(
  'LOAD_TODOS_REQUEST',
  'LOAD_TODOS_SUCCESS',
  'LOAD_TODOS_FAILURE'
)<undefined, Todo[], string>();

// create async fn to save snapshot
export const saveTodosAsync = createAsyncAction(
  'SAVE_TODOS_REQUEST',
  'SAVE_TODOS_SUCCESS',
  'SAVE_TODOS_FAILURE'
)<undefined, undefined, string>();
