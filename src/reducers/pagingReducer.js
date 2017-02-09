import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function navigationReducer(state = initialState.paging, action) {
	switch (action.type) {
		case types.PAGE_CHANGE: {
			return Object.assign({}, state, {page: action.page});
		}
		case types.PAGE_SIZE_CHANGE: {
			return Object.assign({}, state, {pageSize: action.pageSize});
		}
		default:
			return state;
	}
}
