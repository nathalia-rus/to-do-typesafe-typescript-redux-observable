// either already crated, eother not:
// but need here to import the state of the todo from the reducer.

import { TodosState } from './reducer';

export const getTodos = (state: TodosState) => state.todos;
