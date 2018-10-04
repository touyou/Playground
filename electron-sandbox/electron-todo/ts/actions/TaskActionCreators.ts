import Moment from 'moment';
import { ActionCreator } from 'redux';

import { ITask } from '../states/ITask';
import {
    ADD_TASK,
    DELETE_TASK,
    SHOW_TASKS,
    TOGGLE_COMPLETE_TASK,
    IAddTaskAction,
    IDeleteAction,
    IShowTaskAction,
    IToggleCompleteAction,
} from './TaskActions';

/**
 * Create action to show task
 * @param tasks List of tasks
 */
export const createShowTasksAction = (tasks: ITask[]): IShowTaskAction => {
    const dummyTasks: ITask[] = [
        {
            complete: false,
            deadline: Moment().add(1, 'day').toDate(),
            id: '0',
            taskName: 'task01',
        },
        {
            complete: true,
            deadline: Moment().add(1, 'day').toDate(),
            id: '1',
            taskName: 'task02',
        },
        {
            complete: true,
            deadline: Moment().add(-11, 'day').toDate(),
            id: '2',
            taskName: 'task03',
        },
        {
            complete: false,
            deadline: Moment().add(-1, 'day').toDate(),
            id: '3',
            taskName: 'task04',
        },
    ];
    return {
        // tasks,
        tasks: dummyTasks,
        type: SHOW_TASKS,
    };
};

/**
 * Create action to make new task
 * @param taskName name of new task
 * @param deadline deadline of new task
 */
export const createAddTaskAction = (taskName: string, deadline: Date): IAddTaskAction => {
    return {
        deadline,
        taskName,
        type: ADD_TASK,
    };
};

/**
 * Create action to toggle state of completion
 * @param taskId the id of target task
 */
export const createToggleCompleteAction = (taskId: string): IToggleCompleteAction => {
    return {
        taskId,
        type: TOGGLE_COMPLETE_TASK,
    };
};

/**
 * Create action to delete task
 * @param taskId the id of target task
 */
export const createDeleteTaskAction = (taskId: string): IDeleteAction => {
    return {
        taskId,
        type: DELETE_TASK,
    };
};