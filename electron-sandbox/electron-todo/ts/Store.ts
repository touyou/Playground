import { combineReducers, createStore } from 'redux';

import { TaskReducer } from './reducers/TaskReducer';
import { ITaskList } from './states/ITask'

/**
 * Parent state 
 * properties are child_state
 */
export interface IState {
    taskList: ITaskList;
}

const combinedReducer = combineReducers<IState>({
    taskList: TaskReducer,
});

export const store = createStore(combinedReducer);
export default store;