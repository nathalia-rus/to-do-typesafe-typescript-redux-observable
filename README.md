# Todo App with Typesafe Redux, Redux-Obervables, Typescript

App remade from scratch following @piotrwitek documentation in order to familiarize myself with Typescript, Redux, Reduc-Observables, RxJS, Typesafe-Actions. See docs: https://github.com/piotrwitek/typesafe-actions 

## INDEX

### 1. Structure

<h4> <b> Components </b>  </h4>

`< AddTodoForm />, < TodoList />, < TodoListActions />, < TodoListItem />, < TodosView />`

<i> <b> NB/ </b> Atomic not implemented on this project as not part of the focus. </i>

<h4> <b> Pages </b>  </h4>

Simply `< Home />` which renders the `< TodosView />`.


<h4> <b> Redux </b>  </h4>
       
       
       
    REDUX
       
    |--- modules
         |---- todos
              |------- actions.ts
              |------- apics.ts
              |------- reducer.ts
              |------- selector.ts
              |------- types.d.ts
              
              
    |--- services
        |------- index.ts
        |------- todos-api-client.ts
        |------- type.d.ts
        
        
    |--- store
        |------- index.ts
        |------- root-action.ts
        |------- root-epic.ts
        |------- root-reducer.ts
        |------- types.d.ts
        |------- utils.ts




<h4> <b> Store </b>  </h4>


            index.ts
            
Main store configuration. Assembles all actions, all reducers, all services used throughout the app, initializes the state, creates the store and handles the epicMiddleware.

This is where `createEpicMiddleware` makes use of `RootAction`, ` RootState`, `Services` custom modules we created in ./root-action.ts etc are again made great use of.

Right so: 

```js
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

```


onto the rest of the files within the store folder:


            root-action.ts


This is where you import * as ${feature}Actions from ../modules.todos/actions . If more than 1 feature, import them all and combine them there from this file altogether.

Right so:

```js
import { routerActions } from 'react-router-redux';
import * as todoActions from '../modules/todos/actions';

export default {
  router: routerActions,
  todos: todoActions,
};
```

Onto the next file, root-epic : 

            root-action.ts

This is where we make use of `combineEpics`from "redux-obervables". 
Same aslast file -but this time, comibning all actions from our epics.
Right so:

```js
import { combineEpics } from 'redux-observable';

import * as todosEpics from '../modules/todos/epics';

export default combineEpics(...Object.values(todosEpics));
```

Onto the file :


  
            root-reducer.ts

This is where we make use of `combineReducers`from "redux-observables". 

```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todosReducer from '../modules/todos/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
});

export default rootReducer;
```

Now, onto the file where we get the type definitions needed regarding the store folder :


       types.d.ts
       
 Namely, the types of Store, RootState, RootAction, and Types of the RootAction's interface.
 
 ```js
 
 import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  // store I export in store/index
  export type Store = StateType<typeof import('./index').default>;
  // root reducer I export in root-reducer which combines all my reducers.
  export type RootState = StateType<typeof import('./root-reducer').default>;
  // root action I export in root-action which unites all of my actions.
  export type RootAction = ActionType<typeof import('./root-action').default>;
  // types of actions' interface.
  interface Types {
    RootAction: RootAction;
  }
}

 
 ```
 
 fkkhkjhfkj






