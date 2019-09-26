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
