import * as types from './actionTypes';

export function changeSquaresPageSuccess(page) {
	return {type: types.SQUARES_PAGE_CHANGE, page};
}

export function changePointsPageSuccess(page) {
	return {type: types.POINTS_PAGE_CHANGE, page};
}

export function changeSquaresPageSizeSuccess(pageSize) {
	return {type: types.SQUARES_PAGE_SIZE_CHANGE, pageSize};
}

export function changePointsPageSizeSuccess(pageSize) {
	return {type: types.POINTS_PAGE_SIZE_CHANGE, pageSize};
}

export function changeSquaresPageSize(pageSize) {
	return function (dispatch) {
		dispatch(changeSquaresPageSizeSuccess(pageSize));
	};
}

export function changePointsPageSize(pageSize) {
	return function (dispatch) {
		dispatch(changePointsPageSizeSuccess(pageSize));
	};
}

export function changeSquaresPage(page) {
	return function (dispatch) {
		dispatch(changeSquaresPageSuccess(page));
	};
}

export function changePointsPage(page) {
	return function (dispatch) {
		dispatch(changePointsPageSuccess(page));
	};
}
