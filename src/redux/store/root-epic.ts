import { combineEpics } from 'redux-observable';

import * as todosEpics from '../modules/todos/epics';

export default combineEpics(...Object.values(todosEpics));
