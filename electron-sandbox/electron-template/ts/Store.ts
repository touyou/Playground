import { combineReducers, createStore } from 'redux';
import { UserReducer } from './reducers/UserReducer';
import IUser from './states/IUser';

/**
 * storeのデータ型を定義する
 * プロパティには、管理するchild_stateを指定する
 */
export interface IState {
    User: IUser;
}

const combinedReducer = combineReducers<IState>({
    User: UserReducer,
});

export const store = createStore(combinedReducer);

export default store;