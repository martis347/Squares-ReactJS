import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function pointsReducer(state = initialState.squares, action) {
	switch (action.type) {
		case types.GET_SQUARES_SUCCESS: {
			return Object.assign({}, action.squares);
		}
		default:
			return state;
	}
}
