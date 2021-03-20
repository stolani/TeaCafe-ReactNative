import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { products } from './products';
import { carousels } from './carousels';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products,
            carousels
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}