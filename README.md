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

In my opinion, it is better to start with creating all of the folder's files (in .js extension initially so it doesn't throw an error). 
Start coding even if the imports (ex: actions) are not created yet. 
So the structure is there, as the Types declared flow down and are used in the final ./store/index main reducer. Crucially: `RootAction`, `RootState`, `RootEpic`, `services`. Plan in advance the architecture of this - so that it becomes such a bliss as you get going a all is planned and the order in which you're doing things become intuitive and efficient.

Note: Services (with uppercase S) from the modules/services can be created then too. Your choice. 


            index.ts 
            
            // ./store folder 
            
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
            
            // ./store folder 


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

            root-epic.ts
            
            // ./store folder 

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
            
            // ./store folder 

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
       
       // ./store folder 
       
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
 
 and finally, the utils file which contains the composeEnhancers (for redux devtools extension) :
 
 
       utils.ts
       
       // ./store folder 
       
       
which is basically:

```js
import { compose } from 'redux';

export const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
  ```
  

<h4> <b> modules/todos + modules/services </b>  </h4>

Coding from scratch? Let's start with the order that it would make the most sense to start with. In my opinion: 

1. `types.d.ts from ./todos`
2. `actions.ts from ./todos`
3. `selector.ts from ./todos`
4. `types.d.ts from ./services`
5. `todos-api-clients.ts from ./services`
6. `index.ts from ./services`
7. `epics.ts`
8. `reducer.ts`


       types.d.ts
       
       // ./modules/todos folder 
       

This is where the types of the folder's features are defined. In our case, it is a to do app - so it's simply the Todo.

! important. Again, in types.d.ts, like in any other files of that nature, we declare a module. Imported outside as ".." from "nameofmodule".

Right so: 

```js
// declare module here
// so to import elsewhere as import { myModel} from "MyModels"

declare module 'myModels' {
  export type Todo = {
    id: string;
    title: string;
  };
}

```


Model which will be used a lot, amongst other, in the ` actions`, `./modules/services` folder's files.

Next: onto actions.


       actions.ts
       
       // ./modules/todos folder 



Important bit: the use of `"typesafe-actions"` 's lib action creators' helpers.  

`import { createAsyncAction, createStandardAction } from 'typesafe-actions';`

so that:

- create standard actions (not an async or anything fancy):

```js

export const addTodo = createStandardAction('ADD_TODO').map(
  ({ title }: { title: string }): { payload: Todo } => ({
    payload: {
      title: title,
      id: cuid(),
    },
  })
);

export const removeTodo = createStandardAction('REMOVE_TODO')<string>();

```
- create async functions -with automatic helpers that will come in other files regarding the handling of request, success, failure steps:

```js

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


```


voilà!


Next file: selector. Just so it becomes clear of which big chunks of data will be put in the reducer - for bigger clarity of thought ( my opinion ).


       selector.ts
       
       // ./modules/todos folder 


```js

// either already created, either not:
// but need here to import the state of the todo from the reducer.

import { TodosState } from './reducer';

export const getTodos = (state: TodosState) => state.todos;


```


Ok, now let's go to services folder, and then come back to the actions' one.


       types.d.ts
       
       // ./modules/services folder 
       

There, you export the type Services -which remember is used in the `store/index`file (main store). Right so:

```js
import {} from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Services = typeof import('./index').default;
}


```
 
 even if nothing is in ./index just yet.
 
 That's why it could also equally have been created while we were setting up the store folder. 
 
 Then, onto the actual functions :
 
       todos-api-client.ts
       
       // ./modules/services folder 
       
This is where we import the `Todo` model, as we will retrieve the array of todos and initialize if need be -our case.

Right so (specific to our app basic initial setup for demo purposes):

```js

import { Todo } from 'myModels';

let todos: Todo[] = [
  {
    id: '0',
    title: 'This is the first to do coming from api client.',
  },
];


```
 
 and we add the services api actions -here, simply getting our initial hardcoded data which we fake takes time to load with 500 time out: 
 
 ```js
 
 export function loadSnapshot(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  });
}

 
 ````
 
 
 We are now ready to export it all from the index. 
 
        index.ts
       
       // ./modules/services folder 
 
 
 
 Right so:
 
 NB - you can categorize the different types of services so it doesn't get messy overtime and all is clear. So you have this object: 
 
 ```js
 
 import * as todos from './todos-api-client';

export default {
  api: {
    todos,
  },
};

 
 ```
 
 So that in `epics.ts`, you can access `'./todos-api-client'` functions neatly through `api.todos.nameOfFunction()`

Which is the next file:

        epics.ts
       
       // ./modules/todos folder 
     
This is where most of RxJS "magic" is used, along with redux-observable. 

```js

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>

```

Type returned is Epic (observable), which is constituted of RootAction (the actions), the RootState and Services, and takes the action passed as an argument along side the state and any services dependencies -in our case, api. 

So that :


```js

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    switchMap(() =>
      from(api.todos.loadSnapshot()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );

```

ghjklm







