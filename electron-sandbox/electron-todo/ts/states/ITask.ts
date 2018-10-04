import { v4 as UUID } from 'uuid';

/**
 * Task
 */
export interface ITask {
    /** Complete flag */
    complete: boolean;
    /** Deadline */
    deadline: Date;
    /** unique id */
    id: string;
    /** task name */
    taskName: string;
}

/**
 * List of tasks
 */
export interface ITaskList {
    /** List of Tasks */
    tasks: ITask[];
}

/**
 * Initial value of task list
 */
export const initTaskList: ITaskList = {
    tasks: [],
};

/**
 * create task
 * @param taskName name of task
 * @param deadline Deadline
 */
export const createTask = (taskName: string, deadline: Date): ITask => {
    return {
        complete: false,
        deadline,
        id: UUID(),
        taskName,
    };
};