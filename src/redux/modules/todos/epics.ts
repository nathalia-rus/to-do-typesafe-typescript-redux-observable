// mix w/ what of my module added to it
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';
// imports from lib
import { from, of } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, switchMap, catchError, map } from 'rxjs/operators';
// async actions
import { loadTodosAsync, saveTodosAsync } from './actions';
// get the todos already stored in state from the selector
import { getTodos } from './selector';

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) => {
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    switchMap(() =>
      from(api.todos.loadSnapshot()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );
};
