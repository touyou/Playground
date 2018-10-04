import Clone from 'clone';
import Redux from 'redux';

import * as Action from '../actions/TaskActions';
import { createTask, initTaskList, ITaskList } from '../states/ITask';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<ITaskList>();

/** Show the list of tasks */
a2RMapper.addWork<Action.IShowTaskAction>(
    Action.SHOW_TASKS,
    (state, action) => {
        state.tasks = Clone(action.tasks);
    },
);

/** Add task */
a2RMapper.addWork<Action.IAddTaskAction>(
    Action.ADD_TASK,
    (state, action) => {
        state.tasks.push(createTask(action.taskName, action.deadline));
    },
);

/** toggle completion of task */
a2RMapper.addWork<Action.IToggleCompleteAction>(
    Action.TOGGLE_COMPLETE_TASK,
    (state, action) => {
        const { tasks } = state;
        const target = tasks.filter((it) => it.id === action.taskId)[0];
        if (!target) { return; }
        target.complete = !target.complete;
    },
);

/** delete task */
a2RMapper.addWork<Action.IDeleteAction>(
    Action.DELETE_TASK,
    (state, action) => {
        const { tasks } = state;
        const target = tasks.filter((it) => it.id === action.taskId)[0];
        if (!target) { return; }
        state.tasks = tasks.filter((it) => it.id !== action.taskId);
    },
);

/** Reducer */
export const TaskReducer: Redux.Reducer<ITaskList> = (state = initTaskList, action) => {
    return a2RMapper.execute(state, action);
};