import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function listReducer(state = initialState.lists, action) {
	switch (action.type) {
		case types.GET_LISTS_SUCCESS: {
			return action.lists;
		}
		case types.POST_LIST_SUCCESS: {
			return [...state, Object.assign({}, action.listName)];
		}
		case types.DELETE_LIST_SUCCESS: {
			return [...state.filter(list => list !== action.listName)];
		}
		default:
			return state;
	}
}
