import * as ActionTypes from './ActionTypes';

export const carousels = (state = { isLoading: true,
                                     errMess: null,
                                     carousels: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAROUSELS:
            return {...state, isLoading: false, errMess: null, carousels: action.payload};

        case ActionTypes.CAROUSELS_LOADING:
            return {...state, isLoading: true, errMess: null, carousels: []}

        case ActionTypes.CAROUSELS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};