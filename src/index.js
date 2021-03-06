import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from '../src/reducers'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {rootEpic} from "./epics";

const epicMiddleware = createEpicMiddleware();


const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

const appWithProvider = (
    <Provider store={store}>
        <App />
    </Provider>
);
epicMiddleware.run(rootEpic)

ReactDOM.render(appWithProvider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
