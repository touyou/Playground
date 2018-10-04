import clone from 'clone';
import { Action } from 'redux';

type WorkOfAction<S, A extends Action = any> = (state: S, action: A) => void;

/**
 * manage reducer to action
 */
class ActionToReducerMapper<S> {
    /** action type and definition of work */
    private works: { [actionKey: string]: WorkOfAction<S> } = {};
    /** add action type and definition of work */
    public addWork = <A extends Action>(actionType: string, func: WorkOfAction<S, A>) => {
        this.works[actionType] = func;
    }
    /**
     * exec work
     */
    public execute = (state: S, action: Action) => {
        let newState = state;
        const process = this.works[action.type];
        if (!!process) {
            newState = clone(state);
            process(newState, action);
        }
        return newState;
    }
}

const createActionToReducerMapper = <S>() => {
    return new ActionToReducerMapper<S>();
};

export default createActionToReducerMapper;