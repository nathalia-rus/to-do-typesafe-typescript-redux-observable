// declare module here
// so to import elsewhere as import { myModel} from "MyModels"

declare module 'typesafe-actions' {
  export type Todo = {
    id: string;
    title: string;
  };
}
