import Clone from 'clone';
import Redux from 'redux';

import { CHANGE_USER_NAME, IChangeUserNameAction } from '../actions/UserNameEvents';
import IUser, { initUser } from '../states/IUser';

export const UserReducer: Redux.Reducer<IUser> = (childState = initUser, action) => {
    let newChildState: IUser = childState;
    switch (action.type) {
        case CHANGE_USER_NAME:
            {
                newChildState = Clone(childState);
                newChildState.name = (action as IChangeUserNameAction).name;
            }
            break;
    }
    return newChildState;
};