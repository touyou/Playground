import { Action } from 'redux';
import { v4 as UUID } from 'uuid';
import { ITask } from '../states/ITask';

/**
 * Action type to show task list
 */
export const SHOW_TASKS = UUID();

/**
 * Action to show task list
 */
export interface IShowTaskAction extends Action {
    tasks: ITask[];
}

/**
 * Action type to add task
 */
export const ADD_TASK = UUID();

/**
 * Action to add task
 */
export interface IAddTaskAction extends Action {
    deadline: Date;
    taskName: string;
}

/**
 * Action type to complete task
 */
export const TOGGLE_COMPLETE_TASK = UUID();

/**
 * Action to complete task
 */
export interface IToggleCompleteAction extends Action {
    taskId: string;
}

/**
 * Action type to delete task
 */
export const DELETE_TASK = UUID();

/**
 * Action to delete task
 */
export interface IDeleteAction extends Action {
    taskId: string;
}