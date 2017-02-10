import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function navigationReducer(state = initialState.paging, action) {
	switch (action.type) {
		case types.SQUARES_PAGE_CHANGE: {
			return Object.assign({}, state, {squares: Object.assign({}, state.squares, {page: action.page})});
		}
		case types.POINTS_PAGE_CHANGE: {
			return Object.assign({}, state, {points: Object.assign({}, state.points, {page: action.page})});
		}
		case types.POINTS_PAGE_SIZE_CHANGE: {
			return Object.assign({}, state, {points: Object.assign({}, state.points, {pageSize: action.pageSize})});
		}
		case types.SQUARES_PAGE_SIZE_CHANGE: {
			return Object.assign({}, state, {squares: Object.assign({}, state.squares, {pageSize: action.pageSize})});
		}
		default:
			return state;
	}
}
