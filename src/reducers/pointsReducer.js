import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function pointsReducer(state = initialState.points, action) {
	switch (action.type) {
		case types.GET_POINTS_SUCCESS: {
			return Object.assign({}, action.points) ;
		}
		case types.PUT_POINTS_SUCCESS: {
			return state;
		}
		case types.DELETE_POINTS_SUCCESS: {
			return state;
		}
		default:
			return state;
	}
}
