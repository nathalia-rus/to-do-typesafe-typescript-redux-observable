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


            index.js
            
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

kd







  


