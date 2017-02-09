import * as types from './actionTypes';

export function changePageSuccess(page) {
	return {type: types.PAGE_CHANGE, page};
}

export function changePageSizeSuccess(pageSize) {
	return {type: types.PAGE_SIZE_CHANGE, pageSize};
}

export function changePage(page) {
	return function (dispatch) {
		dispatch(changePageSuccess(page));
	};
}

export function changePageSize(page) {
	return function (dispatch) {
		dispatch(changePageSizeSuccess(page));
	};
}
