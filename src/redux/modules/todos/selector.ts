// either already crated, eother not:
// but need here to import the state of the todo from the reducer.

import { TodoState } from './reducer';

export const getTodos = (state: TodoState) => state.todos;
