import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const fetchProducts = () => dispatch => {

    dispatch(productsLoading());

    return fetch(baseUrl + 'products')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(products => dispatch(addProducts(products)))
        .catch(error => dispatch(productsFailed(error.message)));
};

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = errMess => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess
});

export const addProducts = products=> ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});



export const fetchCarousels = () => dispatch => {

    dispatch(carouselsLoading());

    return fetch(baseUrl + 'carousels')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(carousels => dispatch(addCarousels(carousels)))
        .catch(error => dispatch(carouselsFailed(error.message)));
};

export const carouselsLoading = () => ({
    type: ActionTypes.CAROUSELS_LOADING
});

export const carouselsFailed = errMess => ({
    type: ActionTypes.CAROUSELS_FAILED,
    payload: errMess
});

export const addCarousels = carousels=> ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: carousels
});
