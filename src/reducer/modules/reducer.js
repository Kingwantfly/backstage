import { combineReducers } from 'redux';
import user from './user.js';
import company from './company.js';
import supplier from './supplier.js';

const reducerModules = {
    user,
    company,
    supplier
}

export default combineReducers(reducerModules);
