import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Store';
import TaskList from './components/TaskList';

const container = document.getElementById('contents');

ReactDom.render(
    <Provider store={Store}>
        <TaskList />
    </Provider>,
    container,
);