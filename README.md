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



  


