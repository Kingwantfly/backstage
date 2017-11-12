import { createStore as _createStore, applyMiddleware, compose  } from "redux";
import reducer from './modules/reducer';
import thunkMiddleware from 'redux-thunk';

export default function createReducer(initialState = {}) {
    const middleware = [thunkMiddleware];

    let finalCreateStore;
    finalCreateStore = compose(applyMiddleware(...middleware))(_createStore);

    const store = finalCreateStore(reducer, initialState);

    return store;
}
